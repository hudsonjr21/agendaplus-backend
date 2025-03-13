import { Injectable } from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { ClienteRepository } from 'src/domain/repositories/database/cliente.repository';
import { DeleteResult, Repository, FindOneOptions, Like } from 'typeorm';
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
        (error as any).code === '23505'
      ) {
        const message = (error as any).detail;
        if (message.includes('cpf')) {
          throw new ConflictException('CPF já cadastrado.');
        }
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

  async find(filters: any): Promise<Cliente[]> {
    return await this.clienteRepository.find({ where: filters });
  }

  async searchByName(name: string): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      where: [
        { nomeCompleto: Like(`%${name}%`) },
        { nomeSocial: Like(`%${name}%`) },
      ],
    });
  }

  async searchByCPF(cpf: string): Promise<Cliente | null> {
    return await this.clienteRepository.findOne({ where: { cpf } });
  }

  async searchByCity(city: string): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      where: { cidade: Like(`%${city}%`) },
    });
  }

  async searchByState(state: string): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      where: { estado: Like(`%${state}%`) },
    });
  }
}
