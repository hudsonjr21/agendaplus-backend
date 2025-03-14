import { Module } from '@nestjs/common';
import { SaveTransacao } from './save-transacao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transacao } from 'src/infra/database/entities/transacao.entity';
import { TransacaoImpl } from 'src/infra/database/postgres/transacao.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Transacao])],
  providers: [SaveTransacao, TransacaoImpl],
  exports: [SaveTransacao],
})
export class TransacaoModule {}
