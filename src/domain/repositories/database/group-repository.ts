import { Group } from 'src/domain/modules/entities/group.class';
import { DefaultRepository } from './default.repository';
import { ReadStream } from 'typeorm/platform/PlatformTools';

export abstract class GroupRepository extends DefaultRepository<Group> {
  abstract getStream: (filters: Partial<Group>) => Promise<ReadStream>;
  abstract get: (filters: Partial<Group>) => Promise<Group | null>;
}
