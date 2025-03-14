import { Cliente } from './cliente.class';
import { Funcionario } from './funcionario.class';
import { Servico } from './servico.class';

export class Agenda {
  id: number;
  funcionario: Funcionario;
  data: Date;
  horario: string;
  servico: Servico;
  cliente: Cliente;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
