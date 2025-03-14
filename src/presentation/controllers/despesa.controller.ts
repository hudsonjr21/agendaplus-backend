import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DespesaDto } from '../dto/despesa.dto';
import { Despesa } from 'src/infra/database/entities/despesa.entity';
import { DespesaImpl } from 'src/infra/database/postgres/despesa.impl';

@Controller('despesas')
export class DespesaController {
  constructor(private readonly despesaService: DespesaImpl) {}

  @Get()
  async getAll(): Promise<Despesa[]> {
    return this.despesaService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Despesa | null> {
    return this.despesaService.get({ id: Number(id) });
  }

  @Post()
  async create(@Body() despesaDto: DespesaDto): Promise<Despesa> {
    return this.despesaService.save(despesaDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() despesaDto: Partial<DespesaDto>,
  ): Promise<any> {
    return this.despesaService.update(despesaDto, { id: Number(id) });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.despesaService.delete(id);
  }
}
