import {
  Injectable,
  Logger,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { AgendaImpl } from 'src/infra/database/postgres/agenda.impl';
import { Agenda } from 'src/infra/database/entities/agenda.entity';
import { AtendimentoImpl } from 'src/infra/database/postgres/atendimento.impl';
import { Atendimento } from 'src/infra/database/entities/atendimento.entity';
import { ClienteImpl } from 'src/infra/database/postgres/cliente.impl';
import { FuncionarioImpl } from 'src/infra/database/postgres/funcionario.impl';
import { ServicoImpl } from 'src/infra/database/postgres/servico.impl';

@Injectable()
export class SaveAgenda {
  private readonly logger = new Logger(SaveAgenda.name);

  constructor(
    private readonly agendaRepository: AgendaImpl,
    private readonly atendimentoRepository: AtendimentoImpl,
    private readonly clienteRepository: ClienteImpl,
    private readonly funcionarioRepository: FuncionarioImpl,
    private readonly servicoRepository: ServicoImpl,
  ) {}

  async getAllAgendas(): Promise<Agenda[]> {
    this.logger.log('Fetching all agendas');
    return this.agendaRepository.getAll();
  }

  async getAgendaById(id: number): Promise<Agenda | null> {
    this.logger.log(`Fetching agenda with ID: ${id}`);
    return this.agendaRepository.get({ id });
  }

  async createAgenda(agenda: Partial<Agenda>): Promise<Agenda> {
    this.logger.log(`Creating agenda: ${JSON.stringify(agenda)}`);

    // Verificar se as propriedades existem
    if (!agenda.cliente || !agenda.cliente.id) {
      throw new BadRequestException('Cliente não especificado.');
    }
    if (!agenda.funcionario || !agenda.funcionario.id) {
      throw new BadRequestException('Funcionário não especificado.');
    }
    if (!agenda.servico || !agenda.servico.id) {
      throw new BadRequestException('Serviço não especificado.');
    }

    // Verificar se o cliente, funcionário e serviço existem
    const cliente = await this.clienteRepository.get({ id: agenda.cliente.id });
    const funcionario = await this.funcionarioRepository.get({
      id: agenda.funcionario.id,
    });
    const servico = await this.servicoRepository.get({ id: agenda.servico.id });

    if (!cliente) {
      throw new BadRequestException(
        `Cliente com ID ${agenda.cliente.id} não encontrado.`,
      );
    }
    if (!funcionario) {
      throw new BadRequestException(
        `Funcionário com ID ${agenda.funcionario.id} não encontrado.`,
      );
    }
    if (!servico) {
      throw new BadRequestException(
        `Serviço com ID ${agenda.servico.id} não encontrado.`,
      );
    }

    // Verificar se a data e horário são válidos
    const now = new Date();
    const agendaDate = new Date(`${agenda.data}T${agenda.horario}`);
    if (agendaDate < now) {
      throw new BadRequestException(
        'Data e horário não podem ser anteriores ao atual.',
      );
    }

    // Verificar se o funcionário já tem uma agenda no mesmo horário
    const existingFuncionarioAgenda = await this.agendaRepository.find({
      funcionario: agenda.funcionario,
      data: agenda.data,
      horario: agenda.horario,
    });

    if (existingFuncionarioAgenda.length > 0) {
      throw new ConflictException(
        `Funcionário com ID ${agenda.funcionario.id} já tem uma agenda no horário ${agenda.horario} na data ${agenda.data}.`,
      );
    }

    // Verificar se o cliente já tem uma agenda com outro funcionário no mesmo horário
    const existingClienteAgenda = await this.agendaRepository.find({
      cliente: agenda.cliente,
      data: agenda.data,
      horario: agenda.horario,
    });

    if (existingClienteAgenda.length > 0) {
      throw new ConflictException(
        `Cliente com ID ${agenda.cliente.id} já tem uma agenda no horário ${agenda.horario} na data ${agenda.data} com outro funcionário.`,
      );
    }

    const queryRunner = this.agendaRepository
      .getConnection()
      .createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const createdAgenda = await queryRunner.manager.save(Agenda, agenda);

      // Criar um atendimento associado à agenda
      if (
        agenda.cliente &&
        agenda.funcionario &&
        agenda.servico &&
        agenda.data
      ) {
        const atendimento = new Atendimento();
        atendimento.cliente = agenda.cliente;
        atendimento.funcionario = agenda.funcionario;
        atendimento.servico = agenda.servico;
        atendimento.data = agenda.data;
        atendimento.createdAt = new Date();

        await queryRunner.manager.save(atendimento);

        this.logger.log(
          `Agenda created with ID: ${createdAgenda.id} and Atendimento created with ID: ${atendimento.id}`,
        );
      }

      await queryRunner.commitTransaction();
      return createdAgenda;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof ConflictException) {
        throw new ConflictException('Erro ao criar a agenda.');
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateAgenda(id: number, agenda: Partial<Agenda>): Promise<any> {
    this.logger.log(`Updating agenda with ID: ${id}`);
    const existingAgenda = await this.agendaRepository.get({ id });
    if (!existingAgenda) {
      throw new BadRequestException(`Agenda com ID ${id} não encontrada.`);
    }

    const isDataEqual =
      JSON.stringify(existingAgenda) ===
      JSON.stringify({ ...existingAgenda, ...agenda });
    if (isDataEqual) {
      throw new BadRequestException('Os dados já estão atualizados.');
    }

    await this.agendaRepository.update(agenda as Agenda, { id });
    this.logger.log(`Agenda updated with ID: ${id}`);
    return { message: 'Agenda atualizada com sucesso.' };
  }

  async deleteAgenda(id: number): Promise<any> {
    this.logger.log(`Deleting agenda with ID: ${id}`);
    const agenda = await this.agendaRepository.get({ id });
    if (!agenda) {
      throw new BadRequestException(`Agenda com ID ${id} não encontrada.`);
    }

    const deleteResult = await this.agendaRepository.delete(id.toString());
    this.logger.log(`Agenda deleted with ID: ${id}`);

    // Excluir o atendimento associado à agenda
    const atendimento = await this.atendimentoRepository.get({
      cliente: agenda.cliente,
      funcionario: agenda.funcionario,
      servico: agenda.servico,
      data: agenda.data,
    } as Partial<Atendimento>);
    if (atendimento) {
      await this.atendimentoRepository.delete(atendimento.id.toString());
      this.logger.log(`Atendimento deleted with ID: ${atendimento.id}`);
    }

    return deleteResult;
  }

  async searchAgendas(query: any): Promise<Agenda[]> {
    this.logger.log(`Searching agendas with query: ${JSON.stringify(query)}`);
    const { data } = query;
    let filters = {};

    if (data) {
      filters = { data: data };
    }

    return await this.agendaRepository.find(filters);
  }
}
