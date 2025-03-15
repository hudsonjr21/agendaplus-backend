import { User } from 'src/domain/modules/entities/user.class';

export interface UserRepository {
  getOne(id: number, status: boolean): Promise<User>;
  getOneByCPF(cpf: string): Promise<User>;
  getAll(status: boolean, name: string, cpf: string): Promise<User[]>;
  create(user: User): Promise<User>;
  update(user: User | object): Promise<User>;
  delete(id: number): Promise<void>;
}
