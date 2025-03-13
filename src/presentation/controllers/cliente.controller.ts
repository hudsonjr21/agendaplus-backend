import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { SaveCliente } from 'src/domain/modules/usecases/process/cliente/save-cliente';
import { ClienteDto } from '../dto/cliente.dto';
import { Cliente } from 'src/domain/modules/entities/cliente.class';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly saveCliente: SaveCliente) {}

  @Get()
  async getAllClientes(): Promise<Cliente[]> {
    return this.saveCliente.getAllClientes();
  }

  @Get(':id')
  async getClienteById(@Param('id') id: number): Promise<Cliente> {
    const cliente = await this.saveCliente.getClienteById(id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return cliente;
  }

  @Post()
  async createCliente(@Body() clienteDto: ClienteDto): Promise<Cliente> {
    try {
      return await this.saveCliente.createCliente(clienteDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('CPF já cadastrado.');
      }
      throw error;
    }
  }

  @Put(':id')
  async updateCliente(
    @Param('id') id: number,
    @Body() clienteDto: ClienteDto,
  ): Promise<any> {
    return this.saveCliente.updateCliente(id, clienteDto);
  }

  @Delete(':id')
  async deleteCliente(@Param('id') id: number): Promise<any> {
    return this.saveCliente.deleteCliente(id);
  }
}
