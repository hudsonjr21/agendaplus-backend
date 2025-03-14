import { Caixa } from 'src/domain/modules/entities/caixa.class';
import { DefaultRepository } from './default.repository';
import { ReadStream } from 'typeorm/platform/PlatformTools';

export abstract class CaixaRepository extends DefaultRepository<Caixa> {
  abstract getStream: (filters: Partial<Caixa>) => Promise<ReadStream>;
  abstract get: (filters: Partial<Caixa>) => Promise<Caixa | null>;
}
