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

@Injectable()
export class SaveAgenda {
  private readonly logger = new Logger(SaveAgenda.name);

  constructor(
    private readonly agendaRepository: AgendaImpl,
    private readonly atendimentoRepository: AtendimentoImpl,
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
    try {
      const createdAgenda = await this.agendaRepository.save(agenda);

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

        await this.atendimentoRepository.save(atendimento);

        this.logger.log(
          `Agenda created with ID: ${createdAgenda.id} and Atendimento created with ID: ${atendimento.id}`,
        );
      }

      return createdAgenda;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Erro ao criar a agenda.');
      }
      throw error;
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
