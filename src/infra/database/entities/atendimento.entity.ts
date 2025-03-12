import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from './cliente.entity';
import { Funcionario } from './funcionario.entity';
import { Servico } from './servico.entity';

@Entity()
export class Atendimento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'clienteId' })
  cliente: Cliente;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionarioId' })
  funcionario: Funcionario;

  @ManyToOne(() => Servico)
  @JoinColumn({ name: 'servicoId' })
  servico: Servico;

  @Column()
  data: Date;

  @Column()
  horario: string;

  @Column({ nullable: true })
  foto: string;
}
