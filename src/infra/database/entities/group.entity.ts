import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';
import { Transform } from 'class-transformer';

@Entity()
export class Group {
  @Index()
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column()
  access_level?: string;

  @Column()
  description?: string;

  @Column()
  status?: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  @Transform(({ value }) => {
    return new Date(value).toLocaleString('pt-BR');
  })
  created_at?: Date;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  @Transform(({ value }) => {
    return new Date(value).toLocaleString('pt-BR');
  })
  updated_at?: Date;

  @ManyToMany(() => Permission, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'group_permission',
    joinColumn: { name: 'group_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permission_group?: Permission[];

  @ManyToMany(() => User, (user) => user.user_group, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'group_user',
    joinColumn: { name: 'group_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  user_group?: User[];
}
