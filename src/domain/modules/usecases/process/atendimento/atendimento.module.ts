import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atendimento } from 'src/infra/database/entities/atendimento.entity';
import { AtendimentoImpl } from 'src/infra/database/postgres/atendimento.impl';
import { SaveAtendimento } from 'src/domain/modules/usecases/process/atendimento/save-atendimento';
import { AtendimentoController } from 'src/presentation/controllers/atendimento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Atendimento])],
  providers: [AtendimentoImpl, SaveAtendimento],
  controllers: [AtendimentoController],
  exports: [AtendimentoImpl, SaveAtendimento],
})
export class AtendimentoModule {}
