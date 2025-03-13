import { Injectable } from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { ClienteRepository } from 'src/domain/repositories/database/cliente.repository';
import { DeleteResult, Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import { QueryFailedError } from 'typeorm';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class ClienteImpl implements ClienteRepository {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async getStream(filters: Partial<Cliente>): Promise<ReadStream> {
    const myStream = this.clienteRepository.createQueryBuilder('cliente');
    if (filters) {
      myStream.where(filters);
    }
    return myStream.stream();
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.clienteRepository.softDelete(id);
  }

  async get(filters: Partial<Cliente>): Promise<Cliente | null> {
    return await this.clienteRepository.findOne({
      where: filters,
    } as FindOneOptions<Cliente>);
  }

  async getAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  async save(cliente: Partial<Cliente>): Promise<Cliente> {
    try {
      const newCliente = this.clienteRepository.create(cliente);
      return await this.clienteRepository.save(newCliente);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('UQ_980ea33e938c719bbababe43526')
      ) {
        throw new ConflictException('CPF já cadastrado.');
      }
      throw error;
    }
  }

  async update(
    cliente: Partial<Cliente>,
    filters: Partial<Cliente>,
  ): Promise<any> {
    return await this.clienteRepository.update(filters, cliente);
  }
}
