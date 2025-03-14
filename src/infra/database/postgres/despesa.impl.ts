import { Injectable } from '@nestjs/common';
import { Despesa } from '../entities/despesa.entity';
import { DeleteResult, Repository, FindOneOptions, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { DespesaRepository } from 'src/domain/repositories/database/despesa.repository';
import { ReadStream } from 'typeorm/platform/PlatformTools';

@Injectable()
export class DespesaImpl implements DespesaRepository {
  constructor(
    @InjectRepository(Despesa)
    private readonly despesaRepository: Repository<Despesa>,
    private readonly connection: Connection,
  ) {}

  async getStream(filters: Partial<Despesa>): Promise<ReadStream> {
    const myStream = this.despesaRepository.createQueryBuilder('despesa');
    if (filters) {
      myStream.where(filters);
    }
    return myStream.stream();
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.despesaRepository.softDelete(id);
  }

  async get(filters: Partial<Despesa>): Promise<Despesa | null> {
    return await this.despesaRepository.findOne({
      where: filters,
    } as FindOneOptions<Despesa>);
  }

  async getAll(): Promise<Despesa[]> {
    return await this.despesaRepository.find();
  }

  async save(despesa: Partial<Despesa>): Promise<Despesa> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newDespesa = this.despesaRepository.create(despesa);
      const savedDespesa = await queryRunner.manager.save(newDespesa);
      await queryRunner.commitTransaction();
      return savedDespesa;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Erro ao salvar a despesa.');
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    despesa: Partial<Despesa>,
    filters: Partial<Despesa>,
  ): Promise<any> {
    return await this.despesaRepository.update(filters, despesa);
  }

  async find(filters: any): Promise<Despesa[]> {
    return await this.despesaRepository.find({ where: filters });
  }

  async getById(id: number): Promise<Despesa | null> {
    return await this.despesaRepository.findOne({ where: { id } });
  }
}
