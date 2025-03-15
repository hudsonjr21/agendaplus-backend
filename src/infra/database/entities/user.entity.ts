import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Permission } from './permission.entity';
import { Group } from './group.entity';

@Entity('user')
@Index(['cpf'], { unique: true })
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id?: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'cpf', type: 'varchar', length: 14, unique: true })
  cpf: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 20 })
  phone: string;

  @Column({ name: 'identification', type: 'varchar', length: 255 })
  identification: string;

  @Column({ name: 'status', type: 'boolean' })
  status: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', select: false })
  deletedAt?: Date;

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
