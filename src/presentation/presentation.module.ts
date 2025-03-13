import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { ClienteController } from './controllers/cliente.controller';
import { FuncionarioController } from './controllers/funcionario.controller';

@Module({
  imports: [DomainModule],
  controllers: [ClienteController, FuncionarioController],
  providers: [],
  exports: [],
})
export class PresentationModule {}
