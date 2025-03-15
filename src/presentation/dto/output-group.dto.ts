import { ApiProperty } from '@nestjs/swagger';

export class PermissionGroupDto {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  id?: string;
  @ApiProperty()
  access_controll?: string;
  @ApiProperty()
  access_level?: string;
  @ApiProperty()
  title?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  status?: boolean;
  @ApiProperty()
  created_at?: Date;
  @ApiProperty()
  updated_at?: Date;
}

export class UserGroupDto {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  id?: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  cpf?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  phone?: string;
  @ApiProperty()
  identification?: string;
  @ApiProperty()
  status?: boolean;
  @ApiProperty()
  created_at?: Date;
  @ApiProperty()
  updated_at?: Date;
}

export class OutputGroupDto {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  id?: string;
  @ApiProperty()
  title?: string;
  @ApiProperty()
  access_level?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  status?: boolean;
  @ApiProperty()
  created_at?: Date;
  @ApiProperty()
  updated_at?: Date;
  @ApiProperty({
    type: () => [PermissionGroupDto],
  })
  permission_group?: PermissionGroupDto[];
  @ApiProperty({
    type: () => [UserGroupDto],
  })
  user_group?: UserGroupDto[];
}

export class OutputGroupNoRelationsDto {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  id?: string;
  @ApiProperty()
  title?: string;
  @ApiProperty()
  access_level?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  status?: boolean;
  @ApiProperty()
  created_at?: Date;
  @ApiProperty()
  updated_at?: Date;
}
