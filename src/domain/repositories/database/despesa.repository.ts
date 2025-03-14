import { Despesa } from 'src/domain/modules/entities/despesa.class';
import { DefaultRepository } from './default.repository';
import { ReadStream } from 'typeorm/platform/PlatformTools';

export abstract class DespesaRepository extends DefaultRepository<Despesa> {
  abstract getStream: (filters: Partial<Despesa>) => Promise<ReadStream>;
  abstract get: (filters: Partial<Despesa>) => Promise<Despesa | null>;
}
