import {
  Controller,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { Query, Param, Body, Patch } from '@nestjs/common';
import { GetUserDto } from '../dto/output-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UpdateUserPermissionService } from 'src/domain/modules/usecases/process/acess-control/user/update-user-permission-usecase';
import { GetAllUsersService } from 'src/domain/modules/usecases/process/acess-control/user/get-all-user-usecase';
import { GetOneUserService } from 'src/domain/modules/usecases/process/acess-control/user/get-one-user-usecase';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly updateUserPermissionService: UpdateUserPermissionService,
    private readonly getAllUsersService: GetAllUsersService,
    private readonly getOneUsersService: GetOneUserService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllUsers(
    @Query() query: { name: string; cpf: string },
  ): Promise<GetUserDto[]> {
    return await this.getAllUsersService.execute(query);
  }

  @Patch('update-permissions/:id')
  async updateUserPermissions(
    @Param('id') id: number,
    @Body() data: { permissions: string[] },
  ): Promise<void> {
    return await this.updateUserPermissionService.execute(id, data);
  }

  @Get('/:id')
  async getUser(@Param('id') id: number): Promise<GetUserDto> {
    return (await this.getOneUsersService.execute(id)) ?? new GetUserDto();
  }
}
