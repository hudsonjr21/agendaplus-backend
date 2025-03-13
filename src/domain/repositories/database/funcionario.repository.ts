import { Funcionario } from 'src/domain/modules/entities/funcionario.class';
import { DefaultRepository } from './default.repository';
import { ReadStream } from 'typeorm/platform/PlatformTools';

export abstract class FuncionarioRepository extends DefaultRepository<Funcionario> {
  abstract getStream: (filters: Partial<Funcionario>) => Promise<ReadStream>;
  abstract get: (filters: Partial<Funcionario>) => Promise<Funcionario | null>;
}
