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
import { Caixa } from './caixa.entity';
import { Atendimento } from './atendimento.entity';
import { Despesa } from './despesa.entity';

@Entity('transacao')
export class Transacao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'valor', type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({ name: 'tipo', type: 'varchar', length: 20 })
  tipo: string; // "entrada" ou "saida"

  @Column({ name: 'descricao', type: 'varchar', length: 255 })
  descricao: string;

  @ManyToOne(() => Caixa, (caixa) => caixa.transacoes)
  @JoinColumn({ name: 'caixa_id' })
  caixa: Caixa;

  @ManyToOne(() => Atendimento, { nullable: true })
  @JoinColumn({ name: 'atendimento_id' })
  atendimento?: Atendimento;

  @ManyToOne(() => Despesa, { nullable: true })
  @JoinColumn({ name: 'despesa_id' })
  despesa?: Despesa;

  @Column({ name: 'data', type: 'timestamptz' })
  data: Date;
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', select: false })
  deletedAt?: Date;
}
