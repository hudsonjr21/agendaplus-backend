import { User } from 'src/domain/modules/entities/user.class';
import { DefaultRepository } from './default.repository';
import { ReadStream } from 'typeorm/platform/PlatformTools';

export abstract class PermissUserRepositoryionRepository extends DefaultRepository<User> {
  abstract getStream: (filters: Partial<User>) => Promise<ReadStream>;
  abstract get: (filters: Partial<User>) => Promise<User | null>;
}
