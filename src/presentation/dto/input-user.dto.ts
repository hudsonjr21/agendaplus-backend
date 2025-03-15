export class InputUserDto {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  identification: string;
  status: boolean;
  roleId: RoleIdDto | number;
  subsystemsId: SubsystemIdDto[];
}

export class UpdateUserPermissionsDto {
  permissions: string[];
}

export class UpdateStatusDto {
  status: boolean;
}

export class SubsystemIdDto {
  id: number;
  description: string;
}

export class RoleIdDto {
  id: number;
  description: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
