import { Module } from '@nestjs/common';
import { ClienteModule } from './modules/usecases/process/cliente/cliente.module';
import { FuncinarioModule } from './modules/usecases/process/funcionario/funcionario.module';
import { AgendaModule } from './modules/usecases/process/agenda/agenda.module';

@Module({
  imports: [ClienteModule, FuncinarioModule, AgendaModule],
  exports: [ClienteModule, FuncinarioModule, AgendaModule],
})
export class DomainModule {}
