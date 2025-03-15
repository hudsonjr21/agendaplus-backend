import { Module } from '@nestjs/common';
import { SaveTransacao } from './save-transacao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transacao } from 'src/infra/database/entities/transacao.entity';
import { TransacaoImpl } from 'src/infra/database/postgres/transacao.impl';
import { TransacaoController } from 'src/presentation/controllers/transacao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Transacao])],
  providers: [SaveTransacao, TransacaoImpl],
  controllers: [TransacaoController],
  exports: [SaveTransacao],
})
export class TransacaoModule {}
