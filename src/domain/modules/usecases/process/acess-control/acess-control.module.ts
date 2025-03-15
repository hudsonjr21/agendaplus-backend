import { Delete, Get, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/presentation/controllers/auth.controller';
import { GroupController } from 'src/presentation/controllers/group.controller';
import { PermissionController } from 'src/presentation/controllers/permission.controller';
import { UserController } from 'src/presentation/controllers/user.controller';
import { LoginUserService, LoginUserUseCase } from './auth/login-user-usecase';
import {
  CreateGroupService,
  CreateGroupUseCase,
} from './group/create-group-usecase';
import {
  DeleteGroupService,
  DeleteGroupUseCase,
} from './group/delete-group-usecase';
import {
  GetAllGroupsService,
  GetAllGroupUseCase,
} from './group/get-all-group-usecase';
import { GetOneUserService } from './user/get-one-user-usecase';
import {
  UpdateGroupPermissionService,
  UpdateGroupPermissionUseCase,
} from './group/update-group-permission-usecase';
import {
  GetOneGroupService,
  GetOneGroupUseCase,
} from './group/get-one-group-usecase';
import {
  UpdateGroupService,
  UpdateGroupUseCase,
} from './group/update-group-usecase';
import {
  GetAllPermissionService,
  GetAllPermissionUseCase,
} from './permission/get-all-permission-usecase';
import {
  DoesTheUserHavePermissionService,
  DoesTheUserHavePermissionUseCase,
} from './rule/does-the-user-have-permission-usecase';
import {
  GetAllUsersService,
  GetAllUserUseCase,
} from './user/get-all-user-usecase';
import { GetOneUserByCPFUseCase } from './user/get-one-user-by-cpf-usecase';
import { UpdateUserDefaultUseCase } from './user/update-user-default-usecase';
import {
  UpdateUserPermissionService,
  UpdateUserPermissionUseCase,
} from './user/update-user-permission-usecase';
import { User } from 'src/infra/database/entities/user.entity';
import { Group } from 'src/infra/database/entities/group.entity';
import { Permission } from 'src/infra/database/entities/permission.entity';
import { UserImpl } from 'src/infra/database/postgres/user.impl';
import { GroupImpl } from 'src/infra/database/postgres/group.impl';
import { PermissionImpl } from 'src/infra/database/postgres/permission.impl';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group, Permission])],
  providers: [
    LoginUserService,
    LoginUserUseCase,
    CreateGroupService,
    CreateGroupUseCase,
    DeleteGroupService,
    DeleteGroupUseCase,
    GetAllGroupUseCase,
    GetAllGroupsService,
    GetOneUserService,
    GetOneUserService,
    UpdateGroupPermissionService,
    UpdateGroupPermissionUseCase,
    UpdateGroupService,
    UpdateGroupUseCase,
    GetOneGroupService,
    GetOneGroupUseCase,
    GetAllPermissionService,
    GetAllPermissionUseCase,
    DoesTheUserHavePermissionService,
    DoesTheUserHavePermissionUseCase,
    GetAllUserUseCase,
    GetAllUsersService,
    GetOneUserByCPFUseCase,
    UpdateUserDefaultUseCase,
    UpdateUserPermissionService,
    UpdateUserPermissionUseCase,
    UserImpl,
    GroupImpl,
    PermissionImpl,
  ],
  controllers: [
    UserController,
    AuthController,
    GroupController,
    PermissionController,
  ],
  exports: [
    LoginUserService,
    LoginUserUseCase,
    CreateGroupService,
    CreateGroupUseCase,
    DeleteGroupService,
    DeleteGroupUseCase,
    GetAllGroupUseCase,
    GetAllGroupsService,
    GetOneUserService,
    GetOneUserService,
    UpdateGroupPermissionService,
    UpdateGroupPermissionUseCase,
    UpdateGroupService,
    UpdateGroupUseCase,
    GetOneGroupService,
    GetOneGroupUseCase,
    GetAllPermissionService,
    GetAllPermissionUseCase,
    DoesTheUserHavePermissionService,
    DoesTheUserHavePermissionUseCase,
    GetAllUserUseCase,
    GetAllUsersService,
    GetOneUserByCPFUseCase,
    UpdateUserDefaultUseCase,
    UpdateUserPermissionService,
    UpdateUserPermissionUseCase,
  ],
})
export class AcessControlModule {}
