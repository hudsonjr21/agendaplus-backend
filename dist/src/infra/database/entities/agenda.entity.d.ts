import { Funcionario } from './funcionario.entity';
import { Servico } from './servico.entity';
export declare class Agenda {
    id: number;
    funcionario: Funcionario;
    data: Date;
    horario: string;
    servico: Servico;
}
