import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRepository } from 'src/domain/repositories/database/cliente.repository';
import { ENTITIES } from 'src/infra/database/entities';
import { ClienteImpl } from './postgres/cliente.impl';
import { REPOSITORIES } from 'src/domain/repositories/database';
import { FuncionarioRepository } from 'src/domain/repositories/database/funcionario.repository';
import { FuncionarioImpl } from './postgres/funcionario.impl';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
  providers: [
    {
      provide: ClienteRepository,
      useClass: ClienteImpl,
    },
    {
      provide: FuncionarioRepository,
      useClass: FuncionarioImpl,
    },
  ],
  exports: REPOSITORIES,
})
export class DatabaseModule {}
