import { Group } from '../../../entities/group';
import { GetOneGroupUseCase } from './get-one-group-usecase';
import { CreateGroupUseCase } from './create-group-usecase';
import { GetAllPermissionUseCase } from '../permission/get-all-permission-usecase';
import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { UpdateGroupPermissionUseCase } from 'src/@core/domain/modules/usecases/access-control/group/update-group-permission-usecase';

export class UpdateGroupPermissionUseCase {
  constructor(
    private readonly getOneGroupUseCase: GetOneGroupUseCase,
    private readonly createGroupUseCase: CreateGroupUseCase,
    private readonly getAllPermissionUseCase: GetAllPermissionUseCase,
  ) {}

  async execute(
    uuid: string,
    dataGroup: { permissions: string[] },
  ): Promise<Group> {
    const permissions = await this.getAllPermissionUseCase.execute(
      dataGroup.permissions,
    );
    const group = await this.getOneGroupUseCase.execute(uuid).then((data) => {
      return this.createGroupUseCase.execute({
        ...data,
        permission_group: permissions,
      });
    });
    return group;
  }
}

@Injectable()
export class UpdateGroupPermissionService {
  constructor(
    private readonly updateGroupPermissionUseCase: UpdateGroupPermissionUseCase,
  ) {}
  async execute(uuid: string, dataGroup: { permissions: string[] }) {
    return this.updateGroupPermissionUseCase
      .execute(uuid, dataGroup)
      .catch((err) => {
        throw new HttpException(
          'Erro ao atualizar permissões do grupo. ' + err.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
