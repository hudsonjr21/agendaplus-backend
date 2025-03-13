import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

@Entity('cliente')
@Index(['cpf'], { unique: true })
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'nome_completo', type: 'varchar', length: 255 })
  nomeCompleto: string;

  @Column({ name: 'nome_social', type: 'varchar', length: 255, nullable: true })
  nomeSocial: string;

  @Column({ name: 'telefone', type: 'varchar', length: 20 })
  telefone: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'rua', type: 'varchar', length: 255 })
  rua: string;

  @Column({ name: 'cep', type: 'varchar', length: 10 })
  cep: string;

  @Column({ name: 'cidade', type: 'varchar', length: 100 })
  cidade: string;

  @Column({ name: 'estado', type: 'varchar', length: 50 })
  estado: string;

  @Column({ name: 'bairro', type: 'varchar', length: 100 })
  bairro: string;

  @Column({ name: 'cpf', type: 'varchar', length: 14, unique: true })
  cpf: string;

  @Column({ name: 'data_nascimento', type: 'date' })
  dataNascimento: Date;

  @Column({ name: 'sexo', type: 'varchar', length: 10 })
  sexo: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', select: false })
  deletedAt?: Date;
}
