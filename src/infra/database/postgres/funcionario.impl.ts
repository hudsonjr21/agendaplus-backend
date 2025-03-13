import { Injectable } from '@nestjs/common';
import { Funcionario } from '../entities/funcionario.entity';
import { FuncionarioRepository } from 'src/domain/repositories/database/funcionario.repository';
import {
  DeleteResult,
  Repository,
  FindOneOptions,
  Like,
  Connection,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import { QueryFailedError } from 'typeorm';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class FuncionarioImpl implements FuncionarioRepository {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
    private readonly connection: Connection,
  ) {}

  async getStream(filters: Partial<Funcionario>): Promise<ReadStream> {
    const myStream =
      this.funcionarioRepository.createQueryBuilder('funcionario');
    if (filters) {
      myStream.where(filters);
    }
    return myStream.stream();
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.funcionarioRepository.softDelete(id);
  }

  async get(filters: Partial<Funcionario>): Promise<Funcionario | null> {
    return await this.funcionarioRepository.findOne({
      where: filters,
    } as FindOneOptions<Funcionario>);
  }

  async getAll(): Promise<Funcionario[]> {
    return await this.funcionarioRepository.find();
  }

  async save(funcionario: Partial<Funcionario>): Promise<Funcionario> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newFuncionario = this.funcionarioRepository.create(funcionario);
      const savedFuncionario = await queryRunner.manager.save(newFuncionario);
      await queryRunner.commitTransaction();
      return savedFuncionario;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (
        error instanceof QueryFailedError &&
        (error as any).code === '23505'
      ) {
        const message = (error as any).detail;
        if (message.includes('cpf')) {
          throw new ConflictException('CPF já cadastrado.');
        }
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    funcionario: Partial<Funcionario>,
    filters: Partial<Funcionario>,
  ): Promise<any> {
    return await this.funcionarioRepository.update(filters, funcionario);
  }

  async find(filters: any): Promise<Funcionario[]> {
    return await this.funcionarioRepository.find({ where: filters });
  }

  async searchByName(name: string): Promise<Funcionario[]> {
    return await this.funcionarioRepository.find({
      where: [
        { nomeCompleto: Like(`%${name}%`) },
        { nomeSocial: Like(`%${name}%`) },
      ],
    });
  }

  async searchByCPF(cpf: string): Promise<Funcionario | null> {
    return await this.funcionarioRepository.findOne({ where: { cpf } });
  }

  async searchByCity(city: string): Promise<Funcionario[]> {
    return await this.funcionarioRepository.find({
      where: { cidade: Like(`%${city}%`) },
    });
  }

  async searchByState(state: string): Promise<Funcionario[]> {
    return await this.funcionarioRepository.find({
      where: { estado: Like(`%${state}%`) },
    });
  }
}
