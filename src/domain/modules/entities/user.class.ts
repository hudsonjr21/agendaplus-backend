import { Permission } from './permission.class';
import { Group } from './group.class';

export class User {
  id?: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  identification: string;
  status: boolean;
  created_at?: Date;
  updated_at?: Date;
  permission_user?: Permission[];
  user_group?: Group[];
}
