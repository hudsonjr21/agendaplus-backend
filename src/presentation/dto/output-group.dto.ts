export class PermissionGroupDto {
  id?: number;
  access_controll?: string;
  access_level?: string;
  title?: string;
  description?: string;
  status?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class UserGroupDto {
  id?: number;
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  identification?: string;
  status?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class OutputGroupDto {
  id?: number;
  title?: string;
  access_level?: string;
  description?: string;
  status?: boolean;
  created_at?: Date;
  updated_at?: Date;
  permission_group?: PermissionGroupDto[];
  user_group?: UserGroupDto[];
}

export class OutputGroupNoRelationsDto {
  id?: number;
  title?: string;
  access_level?: string;
  description?: string;
  status?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
