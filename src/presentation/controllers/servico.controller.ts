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
import { SaveServico } from '../../domain/modules/usecases/process/servico/save-servico';
import { ServicoDto } from '../dto/servico.dto';
import { Servico } from 'src/domain/modules/entities/servico.class';

@Controller('servicos')
export class ServicoController {
  constructor(private readonly saveServico: SaveServico) {}

  @Get()
  async getAllServicos(@Query() query: any): Promise<Servico[]> {
    if (Object.keys(query).length) {
      return this.saveServico.searchServicos(query);
    }
    return this.saveServico.getAllServicos();
  }

  @Get(':id')
  async getServicoById(@Param('id') id: number): Promise<Servico> {
    const servico = await this.saveServico.getServicoById(id);
    if (!servico) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }
    return servico;
  }

  @Post()
  async createServico(@Body() servicoDto: ServicoDto): Promise<Servico> {
    try {
      return await this.saveServico.createServico(servicoDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Erro ao criar o serviço.');
      }
      throw error;
    }
  }

  @Put(':id')
  async updateServico(
    @Param('id') id: number,
    @Body() servicoDto: ServicoDto,
  ): Promise<any> {
    try {
      return await this.saveServico.updateServico(id, servicoDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteServico(@Param('id') id: number): Promise<any> {
    return this.saveServico.deleteServico(id);
  }
}
