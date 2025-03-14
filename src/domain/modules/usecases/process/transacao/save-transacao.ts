import {
  Injectable,
  Logger,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { TransacaoImpl } from 'src/infra/database/postgres/transacao.impl';
import { Transacao } from 'src/infra/database/entities/transacao.entity';
import { Like } from 'typeorm';

@Injectable()
export class SaveTransacao {
  private readonly logger = new Logger(SaveTransacao.name);

  constructor(private readonly transacaoRepository: TransacaoImpl) {}

  async getAllTransacoes(): Promise<Transacao[]> {
    this.logger.log('Fetching all transactions');
    return this.transacaoRepository.getAll();
  }

  async getTransacaoById(id: number): Promise<Transacao | null> {
    this.logger.log(`Fetching transaction with ID: ${id}`);
    return this.transacaoRepository.get({ id });
  }

  async createTransacao(transacao: Partial<Transacao>): Promise<Transacao> {
    this.logger.log(`Creating transaction: ${JSON.stringify(transacao)}`);
    const createdTransacao = await this.transacaoRepository.save(transacao);
    this.logger.log(`Transaction created with ID: ${createdTransacao.id}`);
    return createdTransacao;
  }

  async updateTransacao(
    id: number,
    transacao: Partial<Transacao>,
  ): Promise<any> {
    this.logger.log(`Updating transaction with ID: ${id}`);
    const existingTransacao = await this.transacaoRepository.get({ id });
    if (!existingTransacao) {
      throw new BadRequestException(`Transação com ID ${id} não encontrada.`);
    }

    const isDataEqual =
      JSON.stringify(existingTransacao) ===
      JSON.stringify({ ...existingTransacao, ...transacao });
    if (isDataEqual) {
      throw new BadRequestException('Os dados já estão atualizados.');
    }

    await this.transacaoRepository.update(transacao as Transacao, { id });
    this.logger.log(`Transaction updated with ID: ${id}`);
    return { message: 'Transação atualizada com sucesso.' };
  }

  async deleteTransacao(id: number): Promise<any> {
    this.logger.log(`Deleting transaction with ID: ${id}`);
    const deleteResult = await this.transacaoRepository.delete(id.toString());
    this.logger.log(`Transaction deleted with ID: ${id}`);
    return deleteResult;
  }

  async searchTransacoes(query: any): Promise<Transacao[]> {
    this.logger.log(
      `Searching transactions with query: ${JSON.stringify(query)}`,
    );
    const { descricao, tipo, data } = query;
    let filters = {};

    if (descricao) {
      filters = { ...filters, descricao: Like(`%${descricao}%`) };
    }
    if (tipo) {
      filters = { ...filters, tipo };
    }
    if (data) {
      filters = { ...filters, data };
    }

    return await this.transacaoRepository.find(filters);
  }
}
