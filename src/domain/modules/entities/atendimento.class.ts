import { Cliente } from './cliente.class';
import { Funcionario } from './funcionario.class';
import { Servico } from './servico.class';

export class Atendimento {
  id: number;
  cliente: Cliente;
  funcionario: Funcionario;
  servico: Servico;
  data: Date;
  foto?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
