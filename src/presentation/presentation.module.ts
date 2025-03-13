import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { ClienteController } from './controllers/cliente.controller';

@Module({
  imports: [DomainModule],
  controllers: [ClienteController],
  providers: [],
  exports: [],
})
export class PresentationModule {}
