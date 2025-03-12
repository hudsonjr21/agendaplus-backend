import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../../../infra/database/entities/cliente.entity';
import { ClienteService } from './cliente.service';
import { ClienteController } from '../../../infra/http/controllers/cliente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  providers: [ClienteService],
  controllers: [ClienteController],
})
export class ClienteModule {}
