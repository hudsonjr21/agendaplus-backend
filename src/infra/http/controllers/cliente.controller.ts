import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClienteService } from '../../../domain/usecases/cliente/cliente.service';
import { Cliente } from '../../database/entities/cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Cliente> {
    return this.clienteService.findOne(id);
  }

  @Post()
  create(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.create(cliente);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.update(id, cliente);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.clienteService.remove(id);
  }
}
