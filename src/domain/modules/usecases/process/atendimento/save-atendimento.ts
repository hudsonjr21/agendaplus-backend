import {
  Injectable,
  Logger,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AtendimentoImpl } from 'src/infra/database/postgres/atendimento.impl';
import { SaveCaixa } from 'src/domain/modules/usecases/process/caixa/save-caixa';
import { Atendimento } from 'src/infra/database/entities/atendimento.entity';

@Injectable()
export class SaveAtendimento {
  private readonly logger = new Logger(SaveAtendimento.name);

  constructor(
    private readonly atendimentoRepository: AtendimentoImpl,
    private readonly saveCaixa: SaveCaixa,
  ) {}

  async getAllAtendimentos(): Promise<Atendimento[]> {
    this.logger.log('Fetching all atendimentos');
    return this.atendimentoRepository.getAll();
  }

  async getAtendimentoById(id: number): Promise<Atendimento | null> {
    this.logger.log(`Fetching atendimento with ID: ${id}`);
    return this.atendimentoRepository.get({ id });
  }

  async createAtendimento(
    atendimento: Partial<Atendimento>,
  ): Promise<Atendimento> {
    this.logger.log(`Creating atendimento: ${JSON.stringify(atendimento)}`);
    try {
      const createdAtendimento =
        await this.atendimentoRepository.save(atendimento);
      this.logger.log(`Atendimento created with ID: ${createdAtendimento.id}`);
      return createdAtendimento;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Erro ao criar o atendimento.');
      }
      throw error;
    }
  }

  async updateAtendimento(
    id: number,
    atendimento: Partial<Atendimento>,
  ): Promise<any> {
    this.logger.log(`Updating atendimento with ID: ${id}`);
    const existingAtendimento = await this.atendimentoRepository.get({ id });
    if (!existingAtendimento) {
      throw new BadRequestException(`Atendimento com ID ${id} não encontrado.`);
    }

    const isDataEqual =
      JSON.stringify(existingAtendimento) ===
      JSON.stringify({ ...existingAtendimento, ...atendimento });
    if (isDataEqual) {
      throw new BadRequestException('Os dados já estão atualizados.');
    }

    await this.atendimentoRepository.update(atendimento as Atendimento, { id });
    this.logger.log(`Atendimento updated with ID: ${id}`);
    return { message: 'Atendimento atualizado com sucesso.' };
  }

  async deleteAtendimento(id: number): Promise<any> {
    this.logger.log(`Deleting atendimento with ID: ${id}`);
    const deleteResult = await this.atendimentoRepository.delete(id.toString());
    this.logger.log(`Atendimento deleted with ID: ${id}`);
    return deleteResult;
  }

  async searchAtendimentos(query: any): Promise<Atendimento[]> {
    this.logger.log(
      `Searching atendimentos with query: ${JSON.stringify(query)}`,
    );
    const { data } = query;
    let filters = {};

    if (data) {
      filters = { data: data };
    }

    return await this.atendimentoRepository.find(filters);
  }

  async searchAtendimentosByDate(date: Date): Promise<Atendimento[]> {
    this.logger.log(`Searching atendimentos by date: ${date}`);
    return this.atendimentoRepository.searchByDate(date);
  }

  async verificarAtendimentos(): Promise<void> {
    const atendimentos = await this.atendimentoRepository.getAll();
    const agora = new Date();

    for (const atendimento of atendimentos) {
      if (atendimento.data < agora) {
        await this.concluirAtendimento(atendimento.id);
      }
    }
  }

  async concluirAtendimento(atendimentoId: number): Promise<Atendimento> {
    const atendimento = await this.atendimentoRepository.getById(atendimentoId);
    if (!atendimento) {
      throw new NotFoundException('Atendimento não encontrado');
    }

    const preco = atendimento.servico.preco;
    await this.saveCaixa.addTransacaoEntrada(atendimentoId, preco);

    return atendimento;
  }
}
