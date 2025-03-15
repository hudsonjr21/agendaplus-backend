import { GetOneGroupUseCase } from './get-one-group-usecase';
import { CreateGroupUseCase } from './create-group-usecase';
import { GetAllPermissionUseCase } from '../permission/get-all-permission-usecase';
import { Injectable } from '@nestjs/common';
import { Group } from 'src/domain/modules/entities/group.class';

@Injectable()
export class UpdateGroupPermissionUseCase {
  constructor(
    private readonly getOneGroupUseCase: GetOneGroupUseCase,
    private readonly createGroupUseCase: CreateGroupUseCase,
    private readonly getAllPermissionUseCase: GetAllPermissionUseCase,
  ) {}

  async execute(
    id: number,
    dataGroup: { permissions: string[] },
  ): Promise<Group> {
    const permissions = await this.getAllPermissionUseCase.execute(
      dataGroup.permissions,
    );
    const group = await this.getOneGroupUseCase.execute(id).then((data) => {
      return this.createGroupUseCase.execute({
        ...data,
        permission_group: permissions,
      });
    });
    return group;
  }
}

// export class UpdateGroupPermissionService {
//   constructor(
//     private readonly updateGroupPermissionUseCase: UpdateGroupPermissionUseCase,
//   ) {}

//   async execute(id: number, dataGroup: { permissions: string[] }) {
//     return this.updateGroupPermissionUseCase
//       .execute(id, dataGroup)
//       .catch((err) => {
//         throw new HttpException(
//           'Erro ao atualizar permissões do grupo. ' + err.message,
//           HttpStatus.BAD_REQUEST,
//         );
//       });
//   }
// }
