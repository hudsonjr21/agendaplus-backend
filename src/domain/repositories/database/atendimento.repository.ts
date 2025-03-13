import { Atendimento } from 'src/domain/modules/entities/atendimento.class';
import { DefaultRepository } from './default.repository';
import { ReadStream } from 'typeorm/platform/PlatformTools';

export abstract class AtendimentoRepository extends DefaultRepository<Atendimento> {
  abstract getStream: (filters: Partial<Atendimento>) => Promise<ReadStream>;
  abstract get: (filters: Partial<Atendimento>) => Promise<Atendimento | null>;
}
