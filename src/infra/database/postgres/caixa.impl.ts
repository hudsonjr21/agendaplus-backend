import { Injectable } from '@nestjs/common';
import { Caixa } from '../entities/caixa.entity';
import { CaixaRepository } from 'src/domain/repositories/database/caixa.repository';
import { DeleteResult, Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { ReadStream } from 'typeorm/platform/PlatformTools';

@Injectable()
export class CaixaImpl implements CaixaRepository {
  constructor(
    @InjectRepository(Caixa)
    private readonly caixaRepository: Repository<Caixa>,
  ) {}

  async getStream(filters: Partial<Caixa>): Promise<ReadStream> {
    const myStream = this.caixaRepository.createQueryBuilder('caixa');
    if (filters) {
      myStream.where(filters);
    }
    return myStream.stream();
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.caixaRepository.softDelete(id);
  }

  async get(filters: Partial<Caixa>): Promise<Caixa | null> {
    return await this.caixaRepository.findOne({
      where: filters,
    } as FindOneOptions<Caixa>);
  }

  async getAll(): Promise<Caixa[]> {
    return await this.caixaRepository.find();
  }

  async save(caixa: Partial<Caixa>): Promise<Caixa> {
    try {
      const newCaixa = this.caixaRepository.create(caixa);
      return await this.caixaRepository.save(newCaixa);
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

  async update(caixa: Partial<Caixa>, filters: Partial<Caixa>): Promise<any> {
    return await this.caixaRepository.update(filters, caixa);
  }
}
