import {
  Injectable,
  Logger,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CaixaImpl } from 'src/infra/database/postgres/caixa.impl';
import { Caixa } from 'src/infra/database/entities/caixa.entity';

@Injectable()
export class SaveCaixa {
  private readonly logger = new Logger(SaveCaixa.name);

  constructor(private readonly caixaRepository: CaixaImpl) {}

  async getAllCaixas(): Promise<Caixa[]> {
    this.logger.log('Fetching all cash registers');
    return this.caixaRepository.getAll();
  }

  async getCaixaById(id: number): Promise<Caixa | null> {
    this.logger.log(`Fetching cash register with ID: ${id}`);
    return this.caixaRepository.get({ id });
  }

  async createCaixa(caixa: Partial<Caixa>): Promise<Caixa> {
    this.logger.log(`Creating cash register: ${JSON.stringify(caixa)}`);
    const createdCaixa = await this.caixaRepository.save(caixa);
    this.logger.log(`Cash register created with ID: ${createdCaixa.id}`);
    return createdCaixa;
  }

  async updateCaixa(id: number, caixa: Partial<Caixa>): Promise<any> {
    this.logger.log(`Updating cash register with ID: ${id}`);
    const existingCaixa = await this.caixaRepository.get({ id });
    if (!existingCaixa) {
      throw new BadRequestException(`Caixa com ID ${id} não encontrada.`);
    }

    const isDataEqual =
      JSON.stringify(existingCaixa) ===
      JSON.stringify({ ...existingCaixa, ...caixa });
    if (isDataEqual) {
      throw new BadRequestException('Os dados já estão atualizados.');
    }

    await this.caixaRepository.update(caixa as Caixa, { id });
    this.logger.log(`Cash register updated with ID: ${id}`);
    return { message: 'Caixa atualizado com sucesso.' };
  }

  async deleteCaixa(id: number): Promise<any> {
    this.logger.log(`Deleting cash register with ID: ${id}`);
    const deleteResult = await this.caixaRepository.delete(id.toString());
    this.logger.log(`Cash register deleted with ID: ${id}`);
    return deleteResult;
  }
}
