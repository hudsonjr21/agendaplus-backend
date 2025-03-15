import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetOneUserUseCase } from '../user/get-one-user-usecase';

@Injectable()
export class DoesTheUserHavePermissionUseCase {
  constructor(private readonly getOneUserUseCase: GetOneUserUseCase) {}

  async execute(id: number, requiredPermissions: number[]): Promise<boolean> {
    const user = await this.getOneUserUseCase.execute(id, true);
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

export class DoesTheUserHavePermissionService {
  constructor(
    private readonly doesTheUserHavePermissionUseCase: DoesTheUserHavePermissionUseCase,
  ) {}

  async execute(id: number, requiredPermissions: number[]): Promise<boolean> {
    return await this.doesTheUserHavePermissionUseCase
      .execute(id, requiredPermissions)
      .catch((err) => {
        throw new HttpException(
          'Erro ao descobrir se usuario tem permissoes necessarias para acesso ' +
            err.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
