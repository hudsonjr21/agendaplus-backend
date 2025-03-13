import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from 'src/infra/database/entities/agenda.entity';
import { SaveAgenda } from './save.agenda';
import { AgendaImpl } from 'src/infra/database/postgres/agenda.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda])],
  providers: [SaveAgenda, AgendaImpl],
  exports: [SaveAgenda],
})
export class AgendaModule {}
