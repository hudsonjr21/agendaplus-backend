import {
  Injectable,
  Logger,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ClienteImpl } from 'src/infra/database/postgres/cliente.impl';
import { Cliente } from 'src/infra/database/entities/cliente.entity';
import { Like } from 'typeorm';

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
    const existingCliente = await this.clienteRepository.get({
      cpf: cliente.cpf,
    });
    if (existingCliente) {
      throw new ConflictException('CPF já cadastrado.');
    }
    const createdCliente = await this.clienteRepository.save(cliente);
    this.logger.log(`Client created with ID: ${createdCliente.id}`);
    return createdCliente;
  }

  async updateCliente(id: number, cliente: Partial<Cliente>): Promise<any> {
    this.logger.log(`Updating client with ID: ${id}`);
    const existingCliente = await this.clienteRepository.get({ id });
    if (!existingCliente) {
      throw new BadRequestException(`Cliente com ID ${id} não encontrado.`);
    }

    const isDuplicateCPF = await this.clienteRepository.get({
      cpf: cliente.cpf,
    });
    if (isDuplicateCPF && isDuplicateCPF.id !== id) {
      throw new ConflictException('CPF já cadastrado.');
    }

    const isDataEqual =
      JSON.stringify(existingCliente) ===
      JSON.stringify({ ...existingCliente, ...cliente });
    if (isDataEqual) {
      throw new BadRequestException('Os dados já estão atualizados.');
    }

    await this.clienteRepository.update(cliente as Cliente, { id });
    this.logger.log(`Client updated with ID: ${id}`);
    return { message: 'Cliente atualizado com sucesso.' };
  }

  async deleteCliente(id: number): Promise<any> {
    this.logger.log(`Deleting client with ID: ${id}`);
    const deleteResult = await this.clienteRepository.delete(id.toString());
    this.logger.log(`Client deleted with ID: ${id}`);
    return deleteResult;
  }

  async searchClientes(query: any): Promise<Cliente[]> {
    this.logger.log(`Searching clients with query: ${JSON.stringify(query)}`);
    const { nome, cpf, nomeSocial, cidade, estado } = query;
    let filters = {};

    if (nome) {
      filters = [
        { nomeCompleto: Like(`%${nome}%`) },
        { nomeSocial: Like(`%${nome}%`) },
      ];
    }
    if (cpf) {
      filters = { ...filters, cpf };
    }
    if (nomeSocial) {
      filters = { ...filters, nomeSocial: Like(`%${nomeSocial}%`) };
    }
    if (cidade) {
      filters = { ...filters, cidade: Like(`%${cidade}%`) };
    }
    if (estado) {
      filters = { ...filters, estado: Like(`%${estado}%`) };
    }

    return await this.clienteRepository.find(filters);
  }
}
