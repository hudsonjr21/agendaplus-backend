import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atendimento } from 'src/infra/database/entities/atendimento.entity';
import { AtendimentoImpl } from 'src/infra/database/postgres/atendimento.impl';
import { SaveAtendimento } from 'src/domain/modules/usecases/process/atendimento/save-atendimento';
import { AtendimentoController } from 'src/presentation/controllers/atendimento.controller';
import { SaveCaixa } from '../caixa/save-caixa';
import { CaixaImpl } from 'src/infra/database/postgres/caixa.impl';
import { TransacaoImpl } from 'src/infra/database/postgres/transacao.impl';
import { DespesaImpl } from 'src/infra/database/postgres/despesa.impl';
import { Caixa } from 'src/infra/database/entities/caixa.entity';
import { Transacao } from 'src/infra/database/entities/transacao.entity';
import { Despesa } from 'src/infra/database/entities/despesa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Atendimento, Caixa, Transacao, Despesa])],
  providers: [
    SaveAtendimento,
    AtendimentoImpl,
    SaveCaixa,
    CaixaImpl,
    TransacaoImpl,
    DespesaImpl,
  ],
  controllers: [AtendimentoController],
  exports: [AtendimentoImpl, SaveAtendimento],
})
export class AtendimentoModule {}
