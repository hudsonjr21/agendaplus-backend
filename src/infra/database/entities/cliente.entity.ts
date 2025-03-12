import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeCompleto: string;

  @Column({ nullable: true })
  nomeSocial: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column()
  rua: string;

  @Column()
  cep: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  bairro: string;

  @Column()
  cpf: string;

  @Column()
  dataNascimento: Date;

  @Column()
  sexo: string;
}
