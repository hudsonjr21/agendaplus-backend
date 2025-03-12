import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Despesa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column({ type: 'decimal' })
  valor: number;

  @Column()
  data: Date;
}
