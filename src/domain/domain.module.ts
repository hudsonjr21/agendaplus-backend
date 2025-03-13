import { Module } from '@nestjs/common';
import { ClienteModule } from './modules/usecases/process/cliente/cliente.module';
import { FuncinarioModule } from './modules/usecases/process/funcionario/funcionario.module';

@Module({
  imports: [ClienteModule, FuncinarioModule],
  exports: [ClienteModule, FuncinarioModule],
})
export class DomainModule {}
