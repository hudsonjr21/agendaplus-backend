import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Transacao } from './transacao.entity';
import { Despesa } from './despesa.entity';

@Entity('caixa')
export class Caixa {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'saldo', type: 'decimal', precision: 10, scale: 2 })
  saldo: number;

  @Column({
    name: 'total_entradas',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  totalEntradas: number;

  @Column({
    name: 'total_saidas',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  totalSaidas: number;

  @Column({
    name: 'ultima_atualizacao',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  ultimaAtualizacao: Date;

  @OneToMany(() => Transacao, (transacao) => transacao.caixa)
  transacoes: Transacao[];

  @OneToMany(() => Despesa, (despesa) => despesa.caixa)
  despesas: Despesa[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', select: false })
  deletedAt?: Date;
}
