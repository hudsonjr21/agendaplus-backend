import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities';
import { Repository, In } from 'typeorm';
import { PermissionRepository } from '../../../../domain/repositories/access-control/permission-repository';

export class PermissionImpl implements PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async getAll(uuid?: []): Promise<Permission[]> {
    const query = this.permissionRepository
      .createQueryBuilder()
      .orderBy('created_at', 'DESC');
    if (uuid) {
      query.where({
        uuid: In(uuid === undefined ? [uuid] : uuid),
      });
    }
    return query.getMany();
  }
}
