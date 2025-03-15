import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity('group')
export class Group {
  @Index()
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id?: number;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title?: string;

  @Column({ name: 'access_level', type: 'varchar', length: 255 })
  access_level?: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  description?: string;

  @Column({ name: 'status', type: 'boolean' })
  status?: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', select: false })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', select: false })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', select: false })
  deleted_at?: Date;

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
