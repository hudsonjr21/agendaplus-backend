import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Despesa } from 'src/infra/database/entities/despesa.entity';
import { DespesaImpl } from 'src/infra/database/postgres/despesa.impl';
import { SaveDespesa } from './save-despesa';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa])],
  providers: [SaveDespesa, DespesaImpl],
  exports: [SaveDespesa],
})
export class DespesaModule {}
