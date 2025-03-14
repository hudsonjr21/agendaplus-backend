import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { ClienteController } from './controllers/cliente.controller';
import { FuncionarioController } from './controllers/funcionario.controller';
import { AgendaController } from './controllers/agenda.controller';
import { AtendimentoController } from './controllers/atendimento.controller';
import { ServicoController } from './controllers/servico.controller';

@Module({
  imports: [DomainModule],
  controllers: [
    ClienteController,
    FuncionarioController,
    AgendaController,
    AtendimentoController,
    ServicoController,
  ],
  providers: [],
  exports: [],
})
export class PresentationModule {}
