import {
  Injectable,
  Logger,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { AtendimentoImpl } from 'src/infra/database/postgres/atendimento.impl';
import { Atendimento } from 'src/infra/database/entities/atendimento.entity';

@Injectable()
export class SaveAtendimento {
  private readonly logger = new Logger(SaveAtendimento.name);

  constructor(private readonly atendimentoRepository: AtendimentoImpl) {}

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
}
