import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { GetAllPermissionService } from '../services/get-all-permission.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ErrorHandleDto,
  InternalServerErrorDto,
} from 'src/@nest-modules/global/dto/output-global.dto';
import { PermissionDto2 } from '../dto/output-permission';

@ApiTags('Permissions')
@ApiBearerAuth()
@ApiResponse({ status: 400, type: ErrorHandleDto })
@ApiResponse({ status: 401, type: ErrorHandleDto })
@ApiResponse({ status: 500, type: InternalServerErrorDto })
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
