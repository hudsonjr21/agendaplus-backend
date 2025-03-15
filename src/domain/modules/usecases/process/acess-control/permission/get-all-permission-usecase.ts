import { PermissionRepository } from 'src/@core/domain/repositories/access-control/permission-repository';
import { Permission } from '../../../entities/permission';
import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { Permission } from 'src/@core/infra/database/typeorm/entities/permission.entity';
import { GetAllPermissionUseCase } from 'src/@core/domain/modules/usecases/access-control/permission/get-all-permission-usecase';
import { HttpException, HttpStatus } from '@nestjs/common';

export class GetAllPermissionUseCase {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(uuid?: string[]): Promise<Permission[]> {
    return await this.permissionRepository.getAll(uuid);
  }
}

@Injectable()
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
