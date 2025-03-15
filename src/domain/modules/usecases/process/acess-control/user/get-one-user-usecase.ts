import { UserRepository } from 'src/@core/domain/repositories/access-control/user-repository';
import { User } from 'src/@core/infra/database/typeorm/entities/user.entity';
import { GetOneUserUseCase } from 'src/@core/domain/modules/usecases/access-control/user/get-one-user-usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

export class GetOneUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(uuid: string, status: boolean) {
    return await this.userRepository.getOne(uuid, status).catch(() => {
      throw new Error('Usuário não encontrado');
    });
  }
}

@Injectable()
export class GetOneUserService {
  constructor(private readonly getOneUserUseCase: GetOneUserUseCase) {}

  async execute(uuid: string): Promise<User | undefined> {
    return await this.getOneUserUseCase.execute(uuid, true).catch((err) => {
      throw new HttpException(
        'Erro ao buscar usuario especificado! ' + err.message,
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
