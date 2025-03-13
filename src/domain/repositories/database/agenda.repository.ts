import { Agenda } from 'src/domain/modules/entities/agenda.class';
import { DefaultRepository } from './default.repository';
import { ReadStream } from 'typeorm/platform/PlatformTools';

export abstract class AgendaRepository extends DefaultRepository<Agenda> {
  abstract getStream: (filters: Partial<Agenda>) => Promise<ReadStream>;
  abstract get: (filters: Partial<Agenda>) => Promise<Agenda | null>;
}
