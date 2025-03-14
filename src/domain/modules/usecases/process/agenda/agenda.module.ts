import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from 'src/infra/database/entities/agenda.entity';
import { Atendimento } from 'src/infra/database/entities/atendimento.entity';
import { AgendaImpl } from 'src/infra/database/postgres/agenda.impl';
import { AtendimentoImpl } from 'src/infra/database/postgres/atendimento.impl';
import { SaveAgenda } from './save-agenda';
import { AgendaController } from 'src/presentation/controllers/agenda.controller';
import { Funcionario } from 'src/infra/database/entities/funcionario.entity';
import { Servico } from 'src/infra/database/entities/servico.entity';
import { ClienteImpl } from 'src/infra/database/postgres/cliente.impl';
import { FuncionarioImpl } from 'src/infra/database/postgres/funcionario.impl';
import { ServicoImpl } from 'src/infra/database/postgres/servico.impl';
import { Cliente } from 'src/infra/database/entities/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Agenda,
      Atendimento,
      Cliente,
      Funcionario,
      Servico,
    ]),
  ],
  providers: [
    SaveAgenda,
    AgendaImpl,
    AtendimentoImpl,
    ClienteImpl,
    FuncionarioImpl,
    ServicoImpl,
  ],
  controllers: [AgendaController],
  exports: [SaveAgenda],
})
export class AgendaModule {}
