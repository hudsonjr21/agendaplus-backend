export class GetUserDto {
  id?: number;
  uuid?: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  identification: string;
  status: boolean;
  created_at?: Date;
  updated_at?: Date;
  user_group?: UserGroupDto[];
}

export class UserGroupDto {
  id?: number;
  title?: string;
  access_level?: string;
  description?: string;
  status?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
