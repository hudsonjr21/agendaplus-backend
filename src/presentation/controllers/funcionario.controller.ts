import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { SaveFuncionario } from 'src/domain/modules/usecases/process/funcionario/save-funcionario';
import { FuncionarioDto } from '../dto/funcionario.dto';
import { Funcionario } from 'src/domain/modules/entities/funcionario.class';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly saveFuncionario: SaveFuncionario) {}

  @Get()
  async getAllFuncionarios(@Query() query: any): Promise<Funcionario[]> {
    if (Object.keys(query).length) {
      return this.saveFuncionario.searchFuncionarios(query);
    }
    return this.saveFuncionario.getAllFuncionarios();
  }

  @Get(':id')
  async getFuncionarioById(@Param('id') id: number): Promise<Funcionario> {
    const funcionario = await this.saveFuncionario.getFuncionarioById(id);
    if (!funcionario) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado`);
    }
    return funcionario;
  }

  @Post()
  async createFuncionario(
    @Body() funcionarioDto: FuncionarioDto,
  ): Promise<Funcionario> {
    try {
      return await this.saveFuncionario.createFuncionario(funcionarioDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('CPF já cadastrado.');
      }
      throw error;
    }
  }

  @Put(':id')
  async updateFuncionario(
    @Param('id') id: number,
    @Body() funcionarioDto: FuncionarioDto,
  ): Promise<any> {
    try {
      return await this.saveFuncionario.updateFuncionario(id, funcionarioDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('CPF já cadastrado.');
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteFuncionario(@Param('id') id: number): Promise<any> {
    return this.saveFuncionario.deleteFuncionario(id);
  }
}
