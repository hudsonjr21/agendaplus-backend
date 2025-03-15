import { Permission } from 'src/domain/modules/entities/permission.class';

export interface PermissionRepository {
  getAll(id?: number[]): Promise<Permission[]>;
}
