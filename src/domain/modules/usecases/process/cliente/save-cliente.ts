import { Injectable } from '@nestjs/common';
import { ClienteImpl } from 'src/infra/database/postgres/cliente.impl';
import { Cliente } from 'src/domain/modules/entities/cliente.class';

@Injectable()
export class SaveCliente {
  constructor(private readonly clienteRepository: ClienteImpl) {}

  async getAllClientes(): Promise<Cliente[]> {
    return this.clienteRepository.getAll();
  }

  async getClienteById(id: number): Promise<Cliente | null> {
    return this.clienteRepository.get({ id });
  }

  async createCliente(cliente: Partial<Cliente>): Promise<Cliente> {
    return this.clienteRepository.save(cliente);
  }

  async updateCliente(id: number, cliente: Partial<Cliente>): Promise<any> {
    return this.clienteRepository.update(cliente, { id });
  }

  async deleteCliente(id: number): Promise<any> {
    return this.clienteRepository.delete(id.toString());
  }
}
