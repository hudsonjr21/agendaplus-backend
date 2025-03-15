import { Permission } from './permission.class';
import { User } from './user.class';

export class Group {
  id?: number;
  title?: string;
  access_level?: string;
  description?: string;
  status?: boolean;
  created_at?: Date;
  updated_at?: Date;
  permission_group?: Permission[];
  user_group?: User[];
}
