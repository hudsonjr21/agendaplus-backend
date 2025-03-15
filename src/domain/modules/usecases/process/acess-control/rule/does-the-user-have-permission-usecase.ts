import { GetOneUserUseCase } from 'src/@core/domain/modules/usecases/access-control/user/get-one-user-usecase';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { DoesTheUserHavePermissionUseCase } from 'src/@core/domain/modules/usecases/access-control/rule/does-the-user-have-permission-usecase';

export class DoesTheUserHavePermissionUseCase {
  constructor(private readonly getOneUserUseCase: GetOneUserUseCase) {}

  async execute(uuid: string, requiredPermissions: number[]): Promise<boolean> {
    const user = await this.getOneUserUseCase.execute(uuid, true);
    const allPermissions = user.user_group.map((group) => {
      return group.permission_group;
    });

    let userPermissions: [][] | any = allPermissions.map((permission) => {
      return permission.map((data) => {
        return data.id;
      });
    });

    if (userPermissions.length > 0) {
      userPermissions = userPermissions.reduce((acc: any, curr: any) => {
        return acc.concat(curr);
      });
    } else {
      userPermissions = [];
    }

    // verificar se array existe em array
    if (requiredPermissions) {
      const havePermission = requiredPermissions.every((permission) => {
        return userPermissions.includes(permission);
      });
      return havePermission;
    }
    return true;
  }
}

@Injectable()
export class DoesTheUserHavePermissionService {
  constructor(
    private readonly doesTheUserHavePermissionUseCase: DoesTheUserHavePermissionUseCase,
  ) {}

  async execute(uuid: string, requiredPermissions: number[]): Promise<boolean> {
    return await this.doesTheUserHavePermissionUseCase
      .execute(uuid, requiredPermissions)
      .catch((err) => {
        throw new HttpException(
          'Erro ao descobrir se usuario tem permissoes necessarias para acesso ao recurso! ' +
            err.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
