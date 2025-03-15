import {
  Controller,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Query, Param, Body, Patch } from '@nestjs/common';
import { GetUserDto } from '../dto/output-user.dto';
import {
  UpdateStatusDto,
  UpdateUserPermissionsDto,
} from '../dto/input-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UpdateUserPermissionService } from 'src/domain/modules/usecases/process/acess-control/user/update-user-permission-usecase';
import { GetAllUsersService } from 'src/domain/modules/usecases/process/acess-control/user/get-all-user-usecase';
import { GetOneUserService } from 'src/domain/modules/usecases/process/acess-control/user/get-one-user-usecase';

@ApiTags('User')
@ApiBearerAuth()
@ApiResponse({ status: 400 })
@ApiResponse({ status: 401 })
@ApiResponse({ status: 500 })
@UseGuards(JwtAuthGuard)
@Controller('user')
export class ApiController {
  constructor(
    private readonly updateUserPermissionService: UpdateUserPermissionService,
    private readonly getAllUsersService: GetAllUsersService,
    private readonly getOneUsersService: GetOneUserService,
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
  @Patch('update-permissions/:id')
  async updateUserPermissions(
    @Param('id') id: number,
    @Body() data: { permissions: string[] },
  ): Promise<void> {
    return await this.updateUserPermissionService.execute(id, data);
  }

  @ApiResponse({ status: 200, type: GetUserDto })
  @Get('/:id')
  async getUser(@Param('id') id: number): Promise<GetUserDto> {
    return await this.getOneUsersService.execute(id);
  }
}
