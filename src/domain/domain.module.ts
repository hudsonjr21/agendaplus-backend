import { Module } from '@nestjs/common';
import { ClienteModule } from './modules/usecases/process/cliente/cliente.module';
import { FuncinarioModule } from './modules/usecases/process/funcionario/funcionario.module';
import { AgendaModule } from './modules/usecases/process/agenda/agenda.module';
import { AtendimentoModule } from './modules/usecases/process/atendimento/atendimento.module';
import { ServicoModule } from './modules/usecases/process/servico/servico.module';
import { DespesaModule } from './modules/usecases/process/despesa/despesa.module';

@Module({
  imports: [
    ClienteModule,
    FuncinarioModule,
    AgendaModule,
    AtendimentoModule,
    ServicoModule,
    DespesaModule,
  ],
  exports: [
    ClienteModule,
    FuncinarioModule,
    AgendaModule,
    AtendimentoModule,
    ServicoModule,
    DespesaModule,
  ],
})
export class DomainModule {}
