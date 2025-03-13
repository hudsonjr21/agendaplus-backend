import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from 'src/infra/database/entities/agenda.entity';
import { SaveAtendimento } from './save-atendimento';
import { AtendimentoImpl } from 'src/infra/database/postgres/atendimento.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda])],
  providers: [SaveAtendimento, AtendimentoImpl],
  exports: [SaveAtendimento],
})
export class AtendimentoModule {}
