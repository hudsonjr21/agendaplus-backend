import { Module } from '@nestjs/common';
import { SaveCliente } from './save-cliente';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/infra/database/entities/cliente.entity';
import { ClienteImpl } from 'src/infra/database/postgres/cliente.impl';
import { ClienteController } from 'src/presentation/controllers/cliente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  providers: [SaveCliente, ClienteImpl],
  controllers: [ClienteController],
  exports: [SaveCliente],
})
export class ClienteModule {}
