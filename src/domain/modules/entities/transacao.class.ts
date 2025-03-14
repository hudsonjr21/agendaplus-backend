import { Atendimento } from './atendimento.class';
import { Caixa } from './caixa.class';
import { Despesa } from './despesa.class';

export class Transacao {
  id: number;
  valor: number;
  tipo: string;
  descricao: string;
  caixa: Caixa;
  atendimento?: Atendimento;
  despesa?: Despesa;
  data: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
