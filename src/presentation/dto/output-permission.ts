export class PermissionDto {
  description: string;
  status: boolean;
}

export class PermissionDto2 {
  id: number;
  access_controll: string;
  access_level: string;
  title: string;
  description: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}
