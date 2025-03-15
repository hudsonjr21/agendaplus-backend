import { UserRepository } from '../../../../repositories/access-control/user-repository';
import { User } from '../../../entities/user';
import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { GetAllUserUseCase } from 'src/@core/domain/modules/usecases/access-control/user/get-all-user-usecase';

export class GetAllUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: { name: string; cpf: string }): Promise<User[]> {
    return await this.userRepository.getAll(null, query.name, query.cpf);
  }
}

@Injectable()
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
