import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Despesa } from 'src/infra/database/entities/despesa.entity';
import { DespesaImpl } from 'src/infra/database/postgres/despesa.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa])],
  providers: [SaveDespesa, DespesaImpl],
  exports: [SaveDespesa],
})
export class DespesaModule {}
