import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/domain/modules/entities/user.class';
import { UserRepository } from 'src/domain/repositories/database/user-repository';

@Injectable()
export class GetAllUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: { name: string; cpf: string }): Promise<User[]> {
    return await this.userRepository.getAll(false, query.name, query.cpf);
  }
}

export class GetAllUsersService {
  constructor(private readonly getAllUserUseCase: GetAllUserUseCase) {}

  async execute(query: { name: string; cpf: string }) {
    return this.getAllUserUseCase.execute(query).catch((err) => {
      throw new HttpException(
        'Erro ao buscar usuarios. ' + err.message,
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
