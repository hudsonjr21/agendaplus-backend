import { Servico } from 'src/domain/modules/entities/servico.class';
import { DefaultRepository } from './default.repository';
import { ReadStream } from 'typeorm/platform/PlatformTools';

export abstract class ServicoRepository extends DefaultRepository<Servico> {
  abstract getStream: (filters: Partial<Servico>) => Promise<ReadStream>;
  abstract get: (filters: Partial<Servico>) => Promise<Servico | null>;
}
