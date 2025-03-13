import { Injectable } from '@nestjs/common';
import { Agenda } from '../entities/agenda.entity';
import { DeleteResult, Repository, FindOneOptions, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { AgendaRepository } from 'src/domain/repositories/database/agenda.repository';

@Injectable()
export class AgendaImpl implements AgendaRepository {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,
    private readonly connection: Connection,
  ) {}

  async getStream(filters: Partial<Agenda>): Promise<any> {
    const myStream = this.agendaRepository.createQueryBuilder('agenda');
    if (filters) {
      myStream.where(filters);
    }
    return myStream.stream();
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.agendaRepository.softDelete(id);
  }

  async get(filters: Partial<Agenda>): Promise<Agenda | null> {
    return await this.agendaRepository.findOne({
      where: filters,
    } as FindOneOptions<Agenda>);
  }

  async getAll(): Promise<Agenda[]> {
    return await this.agendaRepository.find();
  }

  async save(agenda: Partial<Agenda>): Promise<Agenda> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newAgenda = this.agendaRepository.create(agenda);
      const savedAgenda = await queryRunner.manager.save(newAgenda);
      await queryRunner.commitTransaction();
      return savedAgenda;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Erro ao salvar a agenda.');
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    agenda: Partial<Agenda>,
    filters: Partial<Agenda>,
  ): Promise<any> {
    return await this.agendaRepository.update(filters, agenda);
  }

  async find(filters: any): Promise<Agenda[]> {
    return await this.agendaRepository.find({ where: filters });
  }

  async searchByDate(date: Date): Promise<Agenda[]> {
    return await this.agendaRepository.find({ where: { data: date } });
  }
}
