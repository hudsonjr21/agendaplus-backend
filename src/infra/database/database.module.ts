import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRepository } from 'src/domain/repositories/database/cliente.repository';
import { ENTITIES } from 'src/infra/database/entities';
import { ClienteImpl } from './postgres/cliente.impl';
import { REPOSITORIES } from 'src/domain/repositories/database';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
  providers: [
    {
      provide: ClienteRepository,
      useClass: ClienteImpl,
    },
  ],
  exports: REPOSITORIES,
})
export class DatabaseModule {}
