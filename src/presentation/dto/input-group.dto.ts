import { ApiProperty } from '@nestjs/swagger';

export class InputCreateGroupDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  accessLevel: string;
}

export class InputUpdateGroupDto {
  @ApiProperty()
  description?: string;
  @ApiProperty()
  status?: boolean;
}

export class InputUpdateGroupPermissionDto {
  @ApiProperty()
  permissions?: string[];
}
