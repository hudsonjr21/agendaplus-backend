import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRepository } from 'src/domain/repositories/database/cliente.repository';
import { ENTITIES } from 'src/infra/database/entities';
import { ClienteImpl } from './postgres/cliente.impl';
import { REPOSITORIES } from 'src/domain/repositories/database';
import { FuncionarioRepository } from 'src/domain/repositories/database/funcionario.repository';
import { FuncionarioImpl } from './postgres/funcionario.impl';
import { AgendaRepository } from 'src/domain/repositories/database/agenda.repository';
import { AgendaImpl } from './postgres/agenda.impl';
import { AtendimentoRepository } from 'src/domain/repositories/database/atendimento.repository';
import { AtendimentoImpl } from './postgres/atendimento.impl';
import { ServicoImpl } from './postgres/servico.impl';
import { ServicoRepository } from 'src/domain/repositories/database/servico.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
  providers: [
    {
      provide: ClienteRepository,
      useClass: ClienteImpl,
    },
    {
      provide: FuncionarioRepository,
      useClass: FuncionarioImpl,
    },
    {
      provide: AgendaRepository,
      useClass: AgendaImpl,
    },
    {
      provide: AtendimentoRepository,
      useClass: AtendimentoImpl,
    },
    {
      provide: ServicoRepository,
      useClass: ServicoImpl,
    },
  ],
  exports: REPOSITORIES,
})
export class DatabaseModule {}
