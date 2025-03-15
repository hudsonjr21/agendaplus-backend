import { Index } from 'typeorm';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('permission')
export class Permission {
  @Index()
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'access_controll', type: 'varchar', length: 255 })
  access_controll: string;

  @Column({ name: 'access_level', type: 'varchar', length: 255 })
  access_level: string;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @Column({ name: 'status', type: 'boolean' })
  status: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', select: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', select: false })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', select: false })
  deleted_at?: Date;
}
