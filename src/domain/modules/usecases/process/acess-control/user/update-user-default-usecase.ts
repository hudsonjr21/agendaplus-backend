import { UserRepository } from 'src/@core/domain/repositories/access-control/user-repository';
import { User } from '../../../entities/user';

export class UpdateUserDefaultUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User) {
    return this.userRepository.update(user);
  }
}
