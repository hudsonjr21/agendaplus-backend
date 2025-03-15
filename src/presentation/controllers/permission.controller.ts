import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllPermissionService } from 'src/domain/modules/usecases/process/acess-control/permission/get-all-permission-usecase';
import { PermissionDto2 } from '../dto/output-permission';

@ApiTags('Permissions')
@ApiBearerAuth()
@ApiResponse({ status: 400 })
@ApiResponse({ status: 401 })
@ApiResponse({ status: 500 })
@Controller()
export class ApiController {
  constructor(
    private readonly getAllPermissionService: GetAllPermissionService,
  ) {}

  @ApiResponse({ status: 200, type: [PermissionDto2] })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('permissions')
  async getPermissions(): Promise<PermissionDto2[]> {
    return this.getAllPermissionService.execute();
  }
}
