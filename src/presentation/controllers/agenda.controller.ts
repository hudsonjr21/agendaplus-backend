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
import { SaveAgenda } from '../../domain/modules/usecases/process/agenda/save.agenda';
import { AgendaDto } from '../dto/agenda.dto';
import { Agenda } from 'src/domain/modules/entities/agenda.class';

@Controller('agendas')
export class AgendaController {
  constructor(private readonly saveAgenda: SaveAgenda) {}

  @Get()
  async getAllAgendas(@Query() query: any): Promise<Agenda[]> {
    if (Object.keys(query).length) {
      return this.saveAgenda.searchAgendas(query);
    }
    return this.saveAgenda.getAllAgendas();
  }

  @Get(':id')
  async getAgendaById(@Param('id') id: number): Promise<Agenda> {
    const agenda = await this.saveAgenda.getAgendaById(id);
    if (!agenda) {
      throw new NotFoundException(`Agenda com ID ${id} não encontrada`);
    }
    return agenda;
  }

  @Post()
  async createAgenda(@Body() agendaDto: AgendaDto): Promise<Agenda> {
    try {
      return await this.saveAgenda.createAgenda(agendaDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Erro ao criar a agenda.');
      }
      throw error;
    }
  }

  @Put(':id')
  async updateAgenda(
    @Param('id') id: number,
    @Body() agendaDto: AgendaDto,
  ): Promise<any> {
    try {
      return await this.saveAgenda.updateAgenda(id, agendaDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteAgenda(@Param('id') id: number): Promise<any> {
    return this.saveAgenda.deleteAgenda(id);
  }
}
