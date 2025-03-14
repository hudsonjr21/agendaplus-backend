import { Transacao } from 'src/domain/modules/entities/transacao.class';
import { DefaultRepository } from './default.repository';
import { ReadStream } from 'typeorm/platform/PlatformTools';

export abstract class TransacaoRepository extends DefaultRepository<Transacao> {
  abstract getStream: (filters: Partial<Transacao>) => Promise<ReadStream>;
  abstract get: (filters: Partial<Transacao>) => Promise<Transacao | null>;
}
