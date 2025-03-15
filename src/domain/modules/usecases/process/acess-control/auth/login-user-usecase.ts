import { GenerateJwtRepository } from 'src/@core/domain/repositories/global/generate-jwt-repository';
import { GetOneUserUseCase } from '../user/get-one-user-usecase';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserUseCase } from 'src/@core/domain/modules/usecases/access-control/auth/login-user-usecase';

export class LoginUserUseCase {
  constructor(
    private readonly getOneUserUseCase: GetOneUserUseCase,
    private readonly generateJwtRepository: GenerateJwtRepository,
  ) {}

  async execute(uuid: string, status: boolean) {
    const userAuth = await this.getOneUserUseCase.execute(uuid, status);
    const allPermissionsUserGroup = userAuth.user_group.map((group) => {
      return group.permission_group;
    });
    const userPermissionsIdsSeparated: [][] | any = allPermissionsUserGroup.map(
      (permission) => {
        return permission.map((data) => {
          return data.id;
        });
      },
    );
    const userPermissionsIdsJoin =
      userPermissionsIdsSeparated.length !== 0
        ? userPermissionsIdsSeparated.reduce((acc: any, curr: any) => {
            return acc.concat(curr);
          })
        : [];
    if (userAuth) {
      /** generate token */
      const userCredentials = {
        uuid: userAuth.uuid,
        email: userAuth.email,
        name: userAuth.name,
        cpf: userAuth.cpf,
        phone: userAuth.phone,
        identification: userAuth.identification,
        permissions: userPermissionsIdsJoin,
      };
      return {
        access_token:
          await this.generateJwtRepository.generateJwt(userCredentials),
      };
    }
  }
}

@Injectable()
export class LoginUserService {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  async execute(user: { login: string }) {
    return this.loginUserUseCase
      .execute(user.login, true)
      .catch((err: Error) => {
        throw new UnauthorizedException(err);
      });
  }
}
