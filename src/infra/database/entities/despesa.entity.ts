import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', select: false })
  deletedAt?: Date;
}
