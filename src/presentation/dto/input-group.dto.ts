export class InputCreateGroupDto {
  title: string;
  description: string;
  status: boolean;
  accessLevel: string;
}

export class InputUpdateGroupDto {
  description?: string;
  status?: boolean;
}

export class InputUpdateGroupPermissionDto {
  permissions?: string[];
}
