import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/database/user-repository';

@Injectable()
export class GetOneUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(id: number, status: boolean) {
    return await this.userRepository.getOne(id, status).catch(() => {
      throw new Error('Usuário não encontrado');
    });
  }
}

// export class GetOneUserService {
//   constructor(private readonly getOneUserUseCase: GetOneUserUseCase) {}

//   async execute(id: number): Promise<User | undefined> {
//     return await this.getOneUserUseCase.execute(id, true).catch((err) => {
//       throw new HttpException(
//         'Erro ao buscar usuario especificado! ' + err.message,
//         HttpStatus.BAD_REQUEST,
//       );
//     });
//   }
// }
