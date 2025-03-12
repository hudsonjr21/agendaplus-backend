import { Cliente } from './cliente.entity';
import { Funcionario } from './funcionario.entity';
import { Servico } from './servico.entity';
export declare class Atendimento {
    id: number;
    cliente: Cliente;
    funcionario: Funcionario;
    servico: Servico;
    data: Date;
    horario: string;
    foto: string;
}
