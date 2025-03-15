import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DoesTheUserHavePermissionService } from '../does-the-user-have-permission-usecase';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly doesTheUserHavePermissionService: DoesTheUserHavePermissionService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const PERMISSIONS_KEY = 'permissions';
    const requiredRoles = this.reflector.getAllAndOverride<any[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    const req = context.switchToHttp().getRequest();
    if (req.headers?.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const user: { id: number; cpf: string; email: string } =
        this.jwtService.decode(token);

      if (user?.id && user?.cpf && user?.email) {
        const havePermission =
          await this.doesTheUserHavePermissionService.execute(
            user.id,
            requiredRoles,
          );
        if (!havePermission) {
          throw new HttpException('Unauthorized', 401);
        }
        return havePermission;
      }

      throw new HttpException('Unauthorized', 401);
    }

    return true;
  }
}
