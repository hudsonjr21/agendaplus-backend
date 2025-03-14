import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { CaixaImpl } from 'src/infra/database/postgres/caixa.impl';
import { TransacaoImpl } from 'src/infra/database/postgres/transacao.impl';
import { AtendimentoImpl } from 'src/infra/database/postgres/atendimento.impl';
import { DespesaImpl } from 'src/infra/database/postgres/despesa.impl';

@Injectable()
export class SaveCaixa {
  private readonly logger = new Logger(SaveCaixa.name);

  constructor(
    private readonly caixaRepository: CaixaImpl,
    private readonly transacaoRepository: TransacaoImpl,
    private readonly atendimentoRepository: AtendimentoImpl,
    private readonly despesaRepository: DespesaImpl,
  ) {}

  async atualizarSaldoCaixa(): Promise<void> {
    this.logger.log('Atualizando saldo do caixa');
    const totalEntradas = await this.transacaoRepository.sumByTipo('entrada');
    const totalSaidas = await this.transacaoRepository.sumByTipo('saida');
    const saldo = totalEntradas - totalSaidas;

    await this.caixaRepository.updateSaldo({
      totalEntradas,
      totalSaidas,
      saldo,
      ultimaAtualizacao: new Date(),
    });

    this.logger.log('Saldo do caixa atualizado com sucesso');
  }

  async addTransacaoEntrada(
    atendimentoId: number,
    valor: number,
  ): Promise<void> {
    const atendimento = await this.atendimentoRepository.getById(atendimentoId);
    if (!atendimento) {
      throw new ConflictException('Atendimento não encontrado');
    }

    const transacao = {
      valor,
      tipo: 'entrada',
      descricao: `Pagamento do atendimento ${atendimentoId}`,
      data: new Date(),
      atendimento,
    };

    await this.transacaoRepository.save(transacao);
    await this.atualizarSaldoCaixa();
  }

  async addTransacaoSaida(despesaId: number, valor: number): Promise<void> {
    const despesa = await this.despesaRepository.getById(despesaId);
    if (!despesa) {
      throw new ConflictException('Despesa não encontrada');
    }

    const transacao = {
      valor,
      tipo: 'saida',
      descricao: `Despesa ${despesaId}`,
      data: new Date(),
      despesa,
    };

    await this.transacaoRepository.save(transacao);
    await this.atualizarSaldoCaixa();
  }
}
