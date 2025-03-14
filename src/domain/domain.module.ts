import { Module } from '@nestjs/common';
import { ClienteModule } from './modules/usecases/process/cliente/cliente.module';
import { FuncinarioModule } from './modules/usecases/process/funcionario/funcionario.module';
import { AgendaModule } from './modules/usecases/process/agenda/agenda.module';
import { AtendimentoModule } from './modules/usecases/process/atendimento/atendimento.module';
import { ServicoModule } from './modules/usecases/process/servico/servico.module';

@Module({
  imports: [
    ClienteModule,
    FuncinarioModule,
    AgendaModule,
    AtendimentoModule,
    ServicoModule,
  ],
  exports: [
    ClienteModule,
    FuncinarioModule,
    AgendaModule,
    AtendimentoModule,
    ServicoModule,
  ],
})
export class DomainModule {}
