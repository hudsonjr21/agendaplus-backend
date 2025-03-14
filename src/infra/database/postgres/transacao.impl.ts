import { Injectable } from '@nestjs/common';
import { Transacao } from '../entities/transacao.entity';
import { TransacaoRepository } from 'src/domain/repositories/database/transacao.repository';
import { DeleteResult, Repository, FindOneOptions, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import { QueryFailedError } from 'typeorm';
import { ConflictException } from '@nestjs/common';

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
    return await this.transacaoRepository.findOne({
      where: filters,
      relations: ['caixa', 'atendimento', 'despesa'],
    } as FindOneOptions<Transacao>);
  }

  async getAll(): Promise<Transacao[]> {
    return await this.transacaoRepository.find({
      relations: ['caixa', 'atendimento', 'despesa'],
    });
  }

  async save(transacao: Partial<Transacao>): Promise<Transacao> {
    try {
      const newTransacao = this.transacaoRepository.create(transacao);
      return await this.transacaoRepository.save(newTransacao);
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
