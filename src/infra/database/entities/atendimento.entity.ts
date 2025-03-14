import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Cliente } from './cliente.entity';
import { Funcionario } from './funcionario.entity';
import { Servico } from './servico.entity';
import { Agenda } from './agenda.entity';

@Entity('atendimento')
export class Atendimento {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario;

  @ManyToOne(() => Servico)
  @JoinColumn({ name: 'servico_id' })
  servico: Servico;

  @ManyToOne(() => Agenda) // Adicionar relação com Agenda
  @JoinColumn({ name: 'agenda_id' })
  agenda: Agenda;

  @Column({ name: 'data', type: 'date' })
  data: Date;

  @Column({ name: 'foto', type: 'varchar', length: 255, nullable: true })
  foto: string;

  @Column({ name: 'observacao', type: 'varchar', length: 500, nullable: true })
  observacao: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', select: false })
  deletedAt?: Date;
}
