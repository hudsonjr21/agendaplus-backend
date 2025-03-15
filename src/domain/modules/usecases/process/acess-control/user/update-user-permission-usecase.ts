import { UserRepository } from 'src/@core/domain/repositories/access-control/user-repository';
import { GetAllGroupUseCase } from '../group/get-all-group-usecase';
import { GetOneUserUseCase } from './get-one-user-usecase';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateUserPermissionUseCase } from 'src/@core/domain/modules/usecases/access-control/user/update-user-permission-usecase';

export class UpdateUserPermissionUseCase {
  constructor(
    private readonly getAllGroupUseCase: GetAllGroupUseCase,
    private readonly getOneUserUseCase: GetOneUserUseCase,
    private readonly userRepository: UserRepository,
  ) {}
  async execute(uuid: string, dataPermission: { permissions: string[] }) {
    const groups = await this.getAllGroupUseCase.execute(
      null,
      dataPermission.permissions,
    );
    const user = await this.getOneUserUseCase
      .execute(uuid, true)
      .then((data) => {
        this.userRepository.update({
          ...data,
          user_group: groups,
        });
      });
    return user;
  }
}

@Injectable()
export class UpdateUserPermissionService {
  constructor(
    private readonly updateUserPermissionUseCase: UpdateUserPermissionUseCase,
  ) {}
  async execute(uuid: string, dataPermission: { permissions: string[] }) {
    return this.updateUserPermissionUseCase
      .execute(uuid, dataPermission)
      .catch((err) => {
        throw new HttpException(
          'Erro ao atualizar permissões do usuário. ' + err.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
