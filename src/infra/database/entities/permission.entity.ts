import { Transform } from 'class-transformer';
import { Index } from 'typeorm';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @Index()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  access_controll: string;

  @Column()
  access_level: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  @Transform(({ value }) => {
    return new Date(value).toLocaleString('pt-BR');
  })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  @Transform(({ value }) => {
    return new Date(value).toLocaleString('pt-BR');
  })
  updated_at: Date;
}
