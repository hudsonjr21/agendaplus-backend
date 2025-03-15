import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Permission } from './permission.entity';
import { Transform } from 'class-transformer';
import { Group } from './group.entity';
import { OneToMany } from 'typeorm';

@Entity()
export class User {
  @Index()
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  identification: string;

  @Column()
  status: boolean;

  @Transform(({ value }) => {
    return new Date(value).toLocaleString('pt-BR');
  })
  @CreateDateColumn({
    type: 'timestamptz',
  })
  created_at?: Date;

  @Transform(({ value }) => {
    return new Date(value).toLocaleString('pt-BR');
  })
  @CreateDateColumn({
    type: 'timestamptz',
  })
  updated_at?: Date;

  @ManyToMany(() => Permission, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'user_permission',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permission_user?: Permission[];

  @ManyToMany(() => Group, (group) => group.user_group)
  user_group?: Group[];
}
