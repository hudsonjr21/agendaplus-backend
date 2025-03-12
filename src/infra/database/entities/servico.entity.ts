import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column({ type: 'decimal' })
  preco: number;

  @Column()
  duracaoAproximada: string;
}
