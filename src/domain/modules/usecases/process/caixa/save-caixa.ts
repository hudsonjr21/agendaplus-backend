import {
  Injectable,
  Logger,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CaixaImpl } from 'src/infra/database/postgres/caixa.impl';
import { TransacaoImpl } from 'src/infra/database/postgres/transacao.impl';
import { AtendimentoImpl } from 'src/infra/database/postgres/atendimento.impl';
import { DespesaImpl } from 'src/infra/database/postgres/despesa.impl';
import { Caixa } from 'src/infra/database/entities/caixa.entity';
import { Transacao } from 'src/infra/database/entities/transacao.entity';

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

    const caixa = await this.caixaRepository.getAll();
    if (caixa.length === 0) {
      throw new NotFoundException('Caixa não encontrado');
    }

    const caixaAtual = caixa[0];
    caixaAtual.totalEntradas = totalEntradas;
    caixaAtual.totalSaidas = totalSaidas;
    caixaAtual.saldo = saldo;
    caixaAtual.ultimaAtualizacao = new Date();

    await this.caixaRepository.update({ id: caixaAtual.id }, caixaAtual);

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

  async createCaixa(caixa: Partial<Caixa>): Promise<Caixa> {
    this.logger.log('Creating new caixa');
    return await this.caixaRepository.save(caixa);
  }

  async getAllCaixas(): Promise<Caixa[]> {
    this.logger.log('Fetching all caixas');
    return await this.caixaRepository.getAll();
  }

  async getCaixaById(id: number): Promise<Caixa | null> {
    this.logger.log(`Fetching caixa with ID: ${id}`);
    return await this.caixaRepository.get({ id });
  }

  async updateCaixa(id: number, caixa: Partial<Caixa>): Promise<any> {
    this.logger.log(`Updating caixa with ID: ${id}`);
    return await this.caixaRepository.update({ id }, caixa);
  }

  async deleteCaixa(id: number): Promise<any> {
    this.logger.log(`Deleting caixa with ID: ${id}`);
    return await this.caixaRepository.delete(id.toString());
  }
}
