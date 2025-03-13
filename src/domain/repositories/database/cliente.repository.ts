import { Cliente } from 'src/domain/modules/entities/cliente.class';
import { DefaultRepository } from './default.repository';
import { ReadStream } from 'typeorm/platform/PlatformTools';

export abstract class ClienteRepository extends DefaultRepository<Cliente> {
  abstract getStream: (filters: Partial<Cliente>) => Promise<ReadStream>;
}
