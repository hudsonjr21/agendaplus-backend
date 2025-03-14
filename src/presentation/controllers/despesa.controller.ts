import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { SaveDespesa } from 'src/domain/modules/usecases/process/despesa/save-despesa';
import { DespesaDto } from '../dto/despesa.dto';
import { Despesa } from 'src/infra/database/entities/despesa.entity';

@Controller('despesas')
export class DespesaController {
  constructor(private readonly saveDespesa: SaveDespesa) {}

  @Get()
  async getAllDespesas(@Query() query: any): Promise<Despesa[]> {
    if (Object.keys(query).length) {
      return this.saveDespesa.searchDespesas(query);
    }
    return this.saveDespesa.getAllDespesas();
  }

  @Get(':id')
  async getDespesaById(@Param('id') id: number): Promise<Despesa> {
    const despesa = await this.saveDespesa.getDespesaById(id);
    if (!despesa) {
      throw new NotFoundException(`Despesa com ID ${id} não encontrada`);
    }
    return despesa;
  }

  @Post()
  async createDespesa(@Body() despesaDto: DespesaDto): Promise<Despesa> {
    try {
      return await this.saveDespesa.createDespesa(despesaDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Erro ao criar a despesa.');
      }
      throw error;
    }
  }

  @Put(':id')
  async updateDespesa(
    @Param('id') id: number,
    @Body() despesaDto: Partial<DespesaDto>,
  ): Promise<any> {
    try {
      return await this.saveDespesa.updateDespesa(id, despesaDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Erro ao atualizar a despesa.');
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteDespesa(@Param('id') id: number): Promise<any> {
    return this.saveDespesa.deleteDespesa(id);
  }
}
