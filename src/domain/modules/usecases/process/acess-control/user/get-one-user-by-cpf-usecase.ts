import { User } from 'src/domain/modules/entities/user.class';
import { UserRepository } from 'src/domain/repositories/database/user-repository';

export class GetOneUserByCPFUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(cpf: string): Promise<User> {
    return await this.userRepository.getOneByCPF(cpf);
  }
}
