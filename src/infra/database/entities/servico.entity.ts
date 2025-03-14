import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('servico')
export class Servico {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 100 })
  nome: string;

  @Column({ name: 'descricao', type: 'varchar', length: 1000 })
  descricao: string;

  @Column({ name: 'preco', type: 'numeric', precision: 12, scale: 2 })
  preco: number;

  @Column({ name: 'duracao_aproximada', type: 'varchar', length: 20 })
  duracaoAproximada: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', select: false })
  deletedAt?: Date;
}
