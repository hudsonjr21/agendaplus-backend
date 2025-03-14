import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caixa } from 'src/infra/database/entities/caixa.entity';
import { Transacao } from 'src/infra/database/entities/transacao.entity';
import { Atendimento } from 'src/infra/database/entities/atendimento.entity';
import { Despesa } from 'src/infra/database/entities/despesa.entity';
import { CaixaImpl } from 'src/infra/database/postgres/caixa.impl';
import { TransacaoImpl } from 'src/infra/database/postgres/transacao.impl';
import { AtendimentoImpl } from 'src/infra/database/postgres/atendimento.impl';
import { DespesaImpl } from 'src/infra/database/postgres/despesa.impl';
import { SaveCaixa } from 'src/domain/modules/usecases/process/caixa/save-caixa';
import { CaixaController } from 'src/presentation/controllers/caixa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Caixa, Transacao, Atendimento, Despesa])],
  providers: [
    CaixaImpl,
    TransacaoImpl,
    AtendimentoImpl,
    DespesaImpl,
    SaveCaixa,
  ],
  controllers: [CaixaController],
  exports: [SaveCaixa],
})
export class CaixaModule {}
