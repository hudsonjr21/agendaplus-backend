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
import { SaveTransacao } from 'src/domain/modules/usecases/process/transacao/save-transacao';
import { Transacao } from 'src/infra/database/entities/transacao.entity';

@Controller('transacoes')
export class TransacaoController {
  constructor(private readonly saveTransacao: SaveTransacao) {}

  @Post()
  async save(@Body() transacao: Transacao): Promise<Transacao> {
    try {
      return await this.saveTransacao.createTransacao(transacao);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(): Promise<Transacao[]> {
    return this.saveTransacao.getAllTransacoes();
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Transacao> {
    const transacao = await this.saveTransacao.getTransacaoById(id);
    if (!transacao) {
      throw new NotFoundException(`Transação com ID ${id} não encontrada`);
    }
    return transacao;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() transacao: Partial<Transacao>,
  ): Promise<Transacao> {
    try {
      return await this.saveTransacao.updateTransacao(id, transacao);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.saveTransacao.deleteTransacao(id);
  }
}
