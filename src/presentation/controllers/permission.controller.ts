import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { GetAllPermissionService } from 'src/domain/modules/usecases/process/acess-control/permission/get-all-permission-usecase';
import { PermissionDto2 } from '../dto/output-permission';

@Controller()
export class PermissionController {
  constructor(
    private readonly getAllPermissionService: GetAllPermissionService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('permissions')
  async getPermissions(): Promise<PermissionDto2[]> {
    return this.getAllPermissionService.execute();
  }
}
