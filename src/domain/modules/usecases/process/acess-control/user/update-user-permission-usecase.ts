import { UserRepository } from 'src/domain/repositories/database/user-repository';
import { GetAllGroupUseCase } from '../group/get-all-group-usecase';
import { GetOneUserUseCase } from './get-one-user-usecase';
import { Injectable } from '@nestjs/common';

Injectable();
export class UpdateUserPermissionUseCase {
  constructor(
    private readonly getAllGroupUseCase: GetAllGroupUseCase,
    private readonly getOneUserUseCase: GetOneUserUseCase,
    private readonly userRepository: UserRepository,
  ) {}
  async execute(id: number, dataPermission: { permissions: string[] }) {
    const groups = await this.getAllGroupUseCase.execute(
      null,
      dataPermission.permissions,
    );
    const user = await this.getOneUserUseCase.execute(id, true).then((data) => {
      this.userRepository.update({
        ...data,
        user_group: groups,
      });
    });
    return user;
  }
}

// export class UpdateUserPermissionService {
//   constructor(
//     private readonly updateUserPermissionUseCase: UpdateUserPermissionUseCase,
//   ) {}
//   async execute(id: number, dataPermission: { permissions: string[] }) {
//     return this.updateUserPermissionUseCase
//       .execute(id, dataPermission)
//       .catch((err) => {
//         throw new HttpException(
//           'Erro ao atualizar permissões do usuário. ' + err.message,
//           HttpStatus.BAD_REQUEST,
//         );
//       });
//   }
// }
