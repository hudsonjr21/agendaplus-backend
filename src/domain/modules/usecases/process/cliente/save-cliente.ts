import { Injectable, Logger } from '@nestjs/common';
import { ClienteImpl } from 'src/infra/database/postgres/cliente.impl';
import { Cliente } from 'src/domain/modules/entities/cliente.class';

@Injectable()
export class SaveCliente {
  private readonly logger = new Logger(SaveCliente.name);

  constructor(private readonly clienteRepository: ClienteImpl) {}

  async getAllClientes(): Promise<Cliente[]> {
    this.logger.log('Fetching all clients');
    return this.clienteRepository.getAll();
  }

  async getClienteById(id: number): Promise<Cliente | null> {
    this.logger.log(`Fetching client with ID: ${id}`);
    return this.clienteRepository.get({ id });
  }

  async createCliente(cliente: Partial<Cliente>): Promise<Cliente> {
    this.logger.log(`Creating client: ${JSON.stringify(cliente)}`);
    const createdCliente = await this.clienteRepository.save(cliente);
    this.logger.log(`Client created with ID: ${createdCliente.id}`);
    return createdCliente;
  }

  async updateCliente(id: number, cliente: Partial<Cliente>): Promise<any> {
    this.logger.log(`Updating client with ID: ${id}`);
    const updateResult = await this.clienteRepository.update(
      cliente as Cliente,
      { id },
    );
    this.logger.log(`Client updated with ID: ${id}`);
    return updateResult;
  }

  async deleteCliente(id: number): Promise<any> {
    this.logger.log(`Deleting client with ID: ${id}`);
    const deleteResult = await this.clienteRepository.delete(id.toString());
    this.logger.log(`Client deleted with ID: ${id}`);
    return deleteResult;
  }
}
