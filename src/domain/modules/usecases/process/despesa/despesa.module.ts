import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Despesa } from 'src/infra/database/entities/despesa.entity';
import { DespesaImpl } from 'src/infra/database/postgres/despesa.impl';
import { SaveDespesa } from './save-despesa';
import { DespesaController } from 'src/presentation/controllers/despesa.controller';
import { SaveCaixa } from '../caixa/save-caixa';
import { CaixaImpl } from 'src/infra/database/postgres/caixa.impl';
import { TransacaoImpl } from 'src/infra/database/postgres/transacao.impl';
import { Caixa } from 'src/infra/database/entities/caixa.entity';
import { Atendimento } from 'src/infra/database/entities/atendimento.entity';
import { Transacao } from 'src/infra/database/entities/transacao.entity';
import { AtendimentoImpl } from 'src/infra/database/postgres/atendimento.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa, Atendimento, Caixa, Transacao])],
  providers: [
    SaveDespesa,
    DespesaImpl,
    SaveCaixa,
    CaixaImpl,
    TransacaoImpl,
    AtendimentoImpl,
  ],
  controllers: [DespesaController],
  exports: [SaveDespesa],
})
export class DespesaModule {}
