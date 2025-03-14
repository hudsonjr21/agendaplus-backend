import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SaveCaixa } from 'src/domain/modules/usecases/process/caixa/save-caixa';
import { Caixa } from 'src/infra/database/entities/caixa.entity';

@Controller('caixas')
export class CaixaController {
  constructor(private readonly saveCaixa: SaveCaixa) {}

  @Post()
  async save(@Body() caixa: Caixa): Promise<Caixa> {
    try {
      return await this.saveCaixa.createCaixa(caixa);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(): Promise<Caixa[]> {
    return this.saveCaixa.getAllCaixas();
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Caixa> {
    const caixa = await this.saveCaixa.getCaixaById(id);
    if (!caixa) {
      throw new NotFoundException(`Caixa com ID ${id} não encontrada`);
    }
    return caixa;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() caixa: Partial<Caixa>,
  ): Promise<Caixa> {
    try {
      return await this.saveCaixa.updateCaixa(id, caixa);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.saveCaixa.deleteCaixa(id);
  }
}
