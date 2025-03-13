import { Injectable } from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadStream } from 'typeorm/platform/PlatformTools';

@Injectable()
export class ClienteImpl {
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

  // async get(filters: Partial<Cliente>): Promise<Cliente> {
  //   return await this.clienteRepository.findOne(filters);
  // }

  async getAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  // async save(cliente: Partial<Cliente>): Promise<Cliente> {
  //   const exists = await this.get({ id: cliente.id });
  //   if (exists) {
  //     await this.clienteRepository.update({ id: cliente.id }, cliente);
  //     return exists;
  //   } else {
  //     return await this.clienteRepository.save(cliente);
  //   }
  // }

  async update(
    cliente: Partial<Cliente>,
    filters: Partial<Cliente>,
  ): Promise<any> {
    return await this.clienteRepository.update(filters, cliente);
  }
}
