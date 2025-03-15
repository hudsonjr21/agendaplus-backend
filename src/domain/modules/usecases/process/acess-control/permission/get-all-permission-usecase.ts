import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { Permission } from 'src/domain/modules/entities/permission.class';
import { PermissionRepository } from 'src/domain/repositories/database/permission-repository';

@Injectable()
export class GetAllPermissionUseCase {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(id?: number[]): Promise<Permission[]> {
    return await this.permissionRepository.getAll(id);
  }
}

export class GetAllPermissionService {
  constructor(
    private readonly getAllPermissionUseCase: GetAllPermissionUseCase,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  async execute(): Promise<Permission[]> {
    return this.getAllPermissionUseCase.execute().catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }
}
