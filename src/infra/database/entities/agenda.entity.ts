import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Funcionario } from './funcionario.entity';
import { Servico } from './servico.entity';

@Entity()
export class Agenda {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionarioId' })
  funcionario: Funcionario;

  @Column()
  data: Date;

  @Column()
  horario: string;

  @ManyToOne(() => Servico)
  @JoinColumn({ name: 'servicoId' })
  servico: Servico;
}
