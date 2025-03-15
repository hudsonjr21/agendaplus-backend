import { User } from '../../../entities/user';
import { UserRepository } from '../../../../repositories/access-control/user-repository';

export class GetOneUserByCPFUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(cpf: string): Promise<User> {
    return await this.userRepository.getOneByCPF(cpf);
  }
}
