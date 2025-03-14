import { Injectable } from '@nestjs/common';
import { Servico } from '../entities/servico.entity';
import { DeleteResult, Repository, FindOneOptions, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { ServicoRepository } from 'src/domain/repositories/database/servico.repository';

@Injectable()
export class ServicoImpl implements ServicoRepository {
  constructor(
    @InjectRepository(Servico)
    private readonly servicoRepository: Repository<Servico>,
    private readonly connection: Connection,
  ) {}

  async delete(id: string): Promise<DeleteResult> {
    return await this.servicoRepository.softDelete(id);
  }

  async get(filters: Partial<Servico>): Promise<Servico | null> {
    return await this.servicoRepository.findOne({
      where: filters,
    } as FindOneOptions<Servico>);
  }

  async getAll(): Promise<Servico[]> {
    return await this.servicoRepository.find();
  }

  async save(servico: Partial<Servico>): Promise<Servico> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newServico = this.servicoRepository.create(servico);
      const savedServico = await queryRunner.manager.save(newServico);
      await queryRunner.commitTransaction();
      return savedServico;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Erro ao salvar o serviço.');
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    servico: Partial<Servico>,
    filters: Partial<Servico>,
  ): Promise<any> {
    return await this.servicoRepository.update(filters, servico);
  }

  async find(filters: any): Promise<Servico[]> {
    return await this.servicoRepository.find({ where: filters });
  }
}
