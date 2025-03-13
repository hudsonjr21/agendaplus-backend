import { Module } from '@nestjs/common';
import { ClienteModule } from './modules/usecases/process/cliente/cliente.module';

@Module({
  imports: [ClienteModule],
  exports: [ClienteModule],
})
export class DomainModule {}
