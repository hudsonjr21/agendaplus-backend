import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto {
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: boolean;
}

export class PermissionDto2 {
  @ApiProperty()
  id: number;
  @ApiProperty()
  access_controll: string;
  @ApiProperty()
  access_level: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  updated_at: Date;
}
