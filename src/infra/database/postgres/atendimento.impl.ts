import { Injectable } from '@nestjs/common';
import { Atendimento } from '../entities/atendimento.entity';
import { DeleteResult, Repository, FindOneOptions, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { AtendimentoRepository } from 'src/domain/repositories/database/atendimento.repository';

@Injectable()
export class AtendimentoImpl implements AtendimentoRepository {
  constructor(
    @InjectRepository(Atendimento)
    private readonly atendimentoRepository: Repository<Atendimento>,
    private readonly connection: Connection,
  ) {}

  async getStream(filters: Partial<Atendimento>): Promise<any> {
    const myStream =
      this.atendimentoRepository.createQueryBuilder('atendimento');
    if (filters) {
      myStream.where(filters);
    }
    return myStream.stream();
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.atendimentoRepository.softDelete(id);
  }

  async get(filters: Partial<Atendimento>): Promise<Atendimento | null> {
    return await this.atendimentoRepository.findOne({
      where: filters,
      relations: ['cliente', 'funcionario', 'servico', 'agenda'], // Incluir relações
    } as FindOneOptions<Atendimento>);
  }

  async getAll(): Promise<Atendimento[]> {
    return await this.atendimentoRepository.find({
      relations: ['cliente', 'funcionario', 'servico', 'agenda'], // Incluir relações
    });
  }

  async save(atendimento: Partial<Atendimento>): Promise<Atendimento> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newAtendimento = this.atendimentoRepository.create(atendimento);
      const savedAtendimento = await queryRunner.manager.save(newAtendimento);
      await queryRunner.commitTransaction();
      return savedAtendimento;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Erro ao salvar o atendimento.');
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    atendimento: Partial<Atendimento>,
    filters: Partial<Atendimento>,
  ): Promise<any> {
    return await this.atendimentoRepository.update(filters, atendimento);
  }

  async find(filters: any): Promise<Atendimento[]> {
    return await this.atendimentoRepository.find({
      where: filters,
      relations: ['cliente', 'funcionario', 'servico', 'agenda'], // Incluir relações
    });
  }

  async searchByDate(date: Date): Promise<Atendimento[]> {
    return await this.atendimentoRepository.find({
      where: { data: date },
      relations: ['cliente', 'funcionario', 'servico', 'agenda'], // Incluir relações
    });
  }

  async getById(id: number): Promise<Atendimento | null> {
    return await this.atendimentoRepository.findOne({ where: { id } });
  }
}
