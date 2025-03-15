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
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { SaveAtendimento } from '../../domain/modules/usecases/process/atendimento/save-atendimento';
import { AtendimentoDto } from '../dto/atendimento.dto';
import { Atendimento } from 'src/domain/modules/entities/atendimento.class';

@Controller('atendimentos')
export class AtendimentoController {
  constructor(private readonly saveAtendimento: SaveAtendimento) {}

  @Get()
  async getAllAtendimentos(@Query() query: any): Promise<Atendimento[]> {
    if (Object.keys(query).length) {
      return this.saveAtendimento.searchAtendimentos(query);
    }
    return this.saveAtendimento.getAllAtendimentos();
  }

  @Get(':id')
  async getAtendimentoById(@Param('id') id: number): Promise<Atendimento> {
    const atendimento = await this.saveAtendimento.getAtendimentoById(id);
    if (!atendimento) {
      throw new NotFoundException(`Atendimento com ID ${id} não encontrado`);
    }
    return atendimento;
  }

  @Post()
  async createAtendimento(
    @Body() atendimentoDto: AtendimentoDto,
  ): Promise<Atendimento> {
    try {
      return await this.saveAtendimento.createAtendimento(atendimentoDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Erro ao criar o atendimento.');
      }
      throw error;
    }
  }

  @Put(':id')
  async updateAtendimento(
    @Param('id') id: number,
    @Body() atendimentoDto: AtendimentoDto,
  ): Promise<any> {
    try {
      return await this.saveAtendimento.updateAtendimento(id, atendimentoDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteAtendimento(@Param('id') id: number): Promise<any> {
    return this.saveAtendimento.deleteAtendimento(id);
  }

  @Post('verificar')
  async verificarAtendimentos(): Promise<void> {
    return this.saveAtendimento.verificarAtendimentos();
  }
}
