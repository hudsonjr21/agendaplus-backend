import { User } from 'src/domain/modules/entities/user.class';
import { UserRepository } from 'src/domain/repositories/database/user-repository';

export class UpdateUserDefaultUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User) {
    return this.userRepository.update(user);
  }
}
