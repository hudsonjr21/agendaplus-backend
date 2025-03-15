import { Permission } from 'src/domain/modules/entities/permission.class';
import { DefaultRepository } from './default.repository';
import { ReadStream } from 'typeorm/platform/PlatformTools';

export abstract class PermissionRepository extends DefaultRepository<Permission> {
  abstract getStream: (filters: Partial<Permission>) => Promise<ReadStream>;
  abstract get: (filters: Partial<Permission>) => Promise<Permission | null>;
}
