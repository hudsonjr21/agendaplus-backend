import { ApiProperty } from '@nestjs/swagger';

export class InputUserDto {
  @ApiProperty()
  id: number;
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
  @ApiProperty({
    type: () => RoleIdDto,
  })
  roleId: RoleIdDto | number;
  @ApiProperty({ type: () => [SubsystemIdDto] })
  subsystemsId: SubsystemIdDto[];
}

export class UpdateUserPermissionsDto {
  @ApiProperty()
  permissions: string[];
}

export class UpdateStatusDto {
  @ApiProperty()
  status: boolean;
}

export class SubsystemIdDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  description: string;
}

export class RoleIdDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  deletedAt: Date | null;
}
