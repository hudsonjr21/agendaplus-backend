import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  uuid?: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  identification: string;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  created_at?: Date;
  @ApiProperty()
  updated_at?: Date;
  @ApiProperty({
    type: () => [UserGroupDto],
  })
  user_group?: UserGroupDto[];
}

export class UserGroupDto {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  uuid?: string;
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
