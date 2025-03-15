import {
  Controller,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllUsersService } from '../services/get-all-users.service';
import { UpdateUserPermissionService } from '../services/update-user-permission.service';
import { Query, Param, Body, Patch } from '@nestjs/common';
import { GetOneUserService } from '../services/get-one-user.service';
import { ModifyStatusUserService } from '../services/modify-status-user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  ErrorHandleDto,
  InternalServerErrorDto,
} from '../../../global/dto/output-global.dto';
import { GetUserDto } from '../dto/output-user.dto';
import {
  UpdateStatusDto,
  UpdateUserPermissionsDto,
} from '../dto/input-user.dto';

@ApiTags('User')
@ApiBearerAuth()
@ApiResponse({ status: 400, type: ErrorHandleDto })
@ApiResponse({ status: 401, type: ErrorHandleDto })
@ApiResponse({ status: 500, type: InternalServerErrorDto })
@UseGuards(JwtAuthGuard)
@Controller('user')
export class ApiController {
  constructor(
    private readonly updateUserPermissionService: UpdateUserPermissionService,
    private readonly getAllUsersService: GetAllUsersService,
    private readonly getOneUsersService: GetOneUserService,
    private readonly modifyStatusUserService: ModifyStatusUserService,
  ) {}

  @ApiResponse({ status: 200, type: [GetUserDto] })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllUsers(
    @Query() query: { name: string; cpf: string },
  ): Promise<GetUserDto[]> {
    return await this.getAllUsersService.execute(query);
  }

  @ApiBody({ type: UpdateUserPermissionsDto })
  @Patch('update-permissions/:uuid')
  async updateUserPermissions(
    @Param('uuid') uuid: string,
    @Body() data: { permissions: string[] },
  ): Promise<void> {
    return await this.updateUserPermissionService.execute(uuid, data);
  }

  @ApiResponse({ status: 200, type: GetUserDto })
  @Get('/:uuid')
  async getUser(@Param('uuid') uuid: string): Promise<GetUserDto> {
    return await this.getOneUsersService.execute(uuid);
  }

  @ApiBody({ type: UpdateStatusDto })
  @Patch('status/:id')
  async updateStatusUser(
    @Param('id') id: number,
    @Body() data: { status: boolean },
  ): Promise<any> {
    return await this.modifyStatusUserService.execute(id, data.status);
  }
}
