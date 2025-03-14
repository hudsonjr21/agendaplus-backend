import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from 'src/infra/database/entities/agenda.entity';
import { Atendimento } from 'src/infra/database/entities/atendimento.entity';
import { AgendaImpl } from 'src/infra/database/postgres/agenda.impl';
import { AtendimentoImpl } from 'src/infra/database/postgres/atendimento.impl';
import { SaveAgenda } from './save.agenda';
import { AgendaController } from 'src/presentation/controllers/agenda.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda, Atendimento])],
  providers: [AgendaImpl, AtendimentoImpl, SaveAgenda],
  controllers: [AgendaController],
  exports: [AgendaImpl, AtendimentoImpl, SaveAgenda],
})
export class AgendaModule {}
