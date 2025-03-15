import { AgendaRepository } from './agenda.repository';
import { AtendimentoRepository } from './atendimento.repository';
import { CaixaRepository } from './caixa.repository';
import { ClienteRepository } from './cliente.repository';
import { DespesaRepository } from './despesa.repository';
import { FuncionarioRepository } from './funcionario.repository';
import { ServicoRepository } from './servico.repository';
import { TransacaoRepository } from './transacao.repository';

export const REPOSITORIES = [
  ClienteRepository,
  FuncionarioRepository,
  AgendaRepository,
  AtendimentoRepository,
  ServicoRepository,
  DespesaRepository,
  CaixaRepository,
  TransacaoRepository,
];
