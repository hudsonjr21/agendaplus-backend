import {
  Injectable,
  Logger,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { DespesaImpl } from 'src/infra/database/postgres/despesa.impl';
import { Despesa } from 'src/infra/database/entities/despesa.entity';

@Injectable()
export class SaveDespesa {
  private readonly logger = new Logger(SaveDespesa.name);

  constructor(private readonly despesaRepository: DespesaImpl) {}

  async getAllDespesas(): Promise<Despesa[]> {
    this.logger.log('Fetching all despesas');
    return this.despesaRepository.getAll();
  }

  async getDespesaById(id: number): Promise<Despesa | null> {
    this.logger.log(`Fetching despesa with ID: ${id}`);
    return this.despesaRepository.get({ id });
  }

  async createDespesa(despesa: Partial<Despesa>): Promise<Despesa> {
    this.logger.log(`Creating despesa: ${JSON.stringify(despesa)}`);
    try {
      const createdDespesa = await this.despesaRepository.save(despesa);
      this.logger.log(`Despesa created with ID: ${createdDespesa.id}`);
      return createdDespesa;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Erro ao criar a despesa.');
      }
      throw error;
    }
  }

  async updateDespesa(id: number, despesa: Partial<Despesa>): Promise<any> {
    this.logger.log(`Updating despesa with ID: ${id}`);
    const existingDespesa = await this.despesaRepository.get({ id });
    if (!existingDespesa) {
      throw new BadRequestException(`Despesa com ID ${id} não encontrada.`);
    }

    const isDataEqual =
      JSON.stringify(existingDespesa) ===
      JSON.stringify({ ...existingDespesa, ...despesa });
    if (isDataEqual) {
      throw new BadRequestException('Os dados já estão atualizados.');
    }

    await this.despesaRepository.update(despesa as Despesa, { id });
    this.logger.log(`Despesa updated with ID: ${id}`);
    return { message: 'Despesa atualizada com sucesso.' };
  }

  async deleteDespesa(id: number): Promise<any> {
    this.logger.log(`Deleting despesa with ID: ${id}`);
    const deleteResult = await this.despesaRepository.delete(id.toString());
    this.logger.log(`Despesa deleted with ID: ${id}`);
    return deleteResult;
  }

  async searchDespesas(query: any): Promise<Despesa[]> {
    this.logger.log(`Searching despesas with query: ${JSON.stringify(query)}`);
    const { descricao } = query;
    let filters = {};

    if (descricao) {
      filters = { descricao: descricao };
    }

    return await this.despesaRepository.find(filters);
  }
}
