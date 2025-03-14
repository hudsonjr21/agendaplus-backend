import { Injectable } from '@nestjs/common';
import { Transacao } from '../entities/transacao.entity';
import { TransacaoRepository } from 'src/domain/repositories/database/transacao.repository';
import { DeleteResult, Repository, FindOneOptions, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import { QueryFailedError } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { Caixa } from 'src/domain/modules/entities/caixa.class';

@Injectable()
export class TransacaoImpl implements TransacaoRepository {
  constructor(
    @InjectRepository(Transacao)
    private readonly transacaoRepository: Repository<Transacao>,
  ) {}

  async getStream(filters: Partial<Transacao>): Promise<ReadStream> {
    const myStream = this.transacaoRepository.createQueryBuilder('transacao');
    if (filters) {
      myStream.where(filters);
    }
    return myStream.stream();
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.transacaoRepository.softDelete(id);
  }

  async get(filters: Partial<Transacao>): Promise<Transacao | null> {
    const transacao = await this.transacaoRepository.findOne({
      where: filters,
      relations: ['caixa', 'atendimento', 'despesa'],
    } as FindOneOptions<Transacao>);
    if (transacao) {
      transacao.caixaId = transacao.caixa ? transacao.caixa.id : null;
    }
    return transacao;
  }

  async getAll(): Promise<Transacao[]> {
    const transacoes = await this.transacaoRepository.find({
      relations: ['caixa', 'atendimento', 'despesa'],
    });
    transacoes.forEach((transacao) => {
      transacao.caixaId = transacao.caixa ? transacao.caixa.id : null;
    });
    return transacoes;
  }

  async save(transacao: Partial<Transacao>): Promise<Transacao> {
    try {
      const newTransacao = this.transacaoRepository.create(transacao);
      const savedTransacao = await this.transacaoRepository.save(newTransacao);
      savedTransacao.caixaId = savedTransacao.caixa
        ? savedTransacao.caixa.id
        : null;
      return savedTransacao;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).code === '23505'
      ) {
        const message = (error as any).detail;
        if (message.includes('descricao')) {
          throw new ConflictException('Descrição já cadastrada.');
        }
      }
      throw error;
    }
  }

  async update(
    transacao: Partial<Transacao>,
    filters: Partial<Transacao>,
  ): Promise<any> {
    return await this.transacaoRepository.update(filters, transacao);
  }

  async find(filters: any): Promise<Transacao[]> {
    return await this.transacaoRepository.find({ where: filters });
  }

  async searchByDescricao(descricao: string): Promise<Transacao[]> {
    return await this.transacaoRepository.find({
      where: { descricao: Like(`%${descricao}%`) },
    });
  }

  async searchByTipo(tipo: string): Promise<Transacao[]> {
    return await this.transacaoRepository.find({
      where: { tipo },
    });
  }

  async searchByData(data: Date): Promise<Transacao[]> {
    return await this.transacaoRepository.find({
      where: { data },
    });
  }
}
