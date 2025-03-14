import { Module } from '@nestjs/common';
import { SaveCaixa } from './save-caixa';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caixa } from 'src/infra/database/entities/caixa.entity';
import { CaixaImpl } from 'src/infra/database/postgres/caixa.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Caixa])],
  providers: [SaveCaixa, CaixaImpl],
  exports: [SaveCaixa],
})
export class CaixaModule {}
