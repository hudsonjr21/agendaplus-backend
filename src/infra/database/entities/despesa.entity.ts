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

@Entity('despesa')
export class Despesa {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'descricao', type: 'varchar', length: 255 })
  descricao: string;

  @Column({ name: 'valor', type: 'numeric', precision: 12, scale: 2 })
  valor: number;

  @Column({ name: 'data', type: 'date' })
  data: Date;

  @ManyToOne(() => Caixa, (caixa) => caixa.despesas)
  @JoinColumn({ name: 'caixa_id' })
  caixa: Caixa;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', select: false })
  deletedAt?: Date;
}
