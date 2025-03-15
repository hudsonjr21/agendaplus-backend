import {
  Post,
  Get,
  Put,
  Controller,
  Param,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  OutputGroupDto,
  OutputGroupNoRelationsDto,
} from '../dto/output-group.dto';
import {
  InputCreateGroupDto,
  InputUpdateGroupDto,
  InputUpdateGroupPermissionDto,
} from '../dto/input-group.dto';
import { UpdateGroupPermissionService } from 'src/domain/modules/usecases/process/acess-control/group/update-group-permission-usecase';
import { CreateGroupService } from 'src/domain/modules/usecases/process/acess-control/group/create-group-usecase';
import { UpdateGroupService } from 'src/domain/modules/usecases/process/acess-control/group/update-group-usecase';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GetAllGroupsService } from 'src/domain/modules/usecases/process/acess-control/group/get-all-group-usecase';
import { DeleteGroupService } from 'src/domain/modules/usecases/process/acess-control/group/delete-group-usecase';
import { GetOneGroupService } from 'src/domain/modules/usecases/process/acess-control/group/get-one-group-usecase';

@ApiTags('Group')
@ApiBearerAuth()
@ApiResponse({ status: 400 })
@ApiResponse({ status: 401 })
@ApiResponse({ status: 500 })
@UseGuards(JwtAuthGuard)
@Controller('group')
export class ApiController {
  constructor(
    private readonly updateGroupPermissionService: UpdateGroupPermissionService,
    private readonly createGroupService: CreateGroupService,
    private readonly updateGroupService: UpdateGroupService,
    private readonly getAllGroupsService: GetAllGroupsService,
    private readonly deleteGroupService: DeleteGroupService,
    private readonly getOneGroupService: GetOneGroupService,
  ) {}

  @ApiResponse({ status: 200, type: [OutputGroupDto] })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async getAllGroups(
    @Query() query: { params: string },
  ): Promise<OutputGroupDto[]> {
    return await this.getAllGroupsService.execute(
      query.params ? JSON.parse(query.params) : {},
    );
  }

  @ApiResponse({ status: 200, type: OutputGroupDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async getGroup(@Param('id') id: number): Promise<OutputGroupDto> {
    return await this.getOneGroupService.execute(id);
  }

  @ApiResponse({ status: 201, type: OutputGroupNoRelationsDto })
  @ApiBody({ type: InputCreateGroupDto })
  @Post('create')
  async createGroup(
    @Body()
    data: InputCreateGroupDto,
  ): Promise<OutputGroupNoRelationsDto> {
    return await this.createGroupService.execute(data);
  }

  @Delete('delete/:id')
  async deleteGroup(@Param('id') id: number): Promise<void> {
    return await this.deleteGroupService.execute(id);
  }

  @ApiResponse({ status: 200, type: InputUpdateGroupDto })
  @ApiBody({ type: OutputGroupDto })
  @Put('update/:id')
  async updateGroup(
    @Param('id') id: number,
    @Body() data: { description: string; status: boolean },
  ): Promise<InputUpdateGroupDto> {
    return await this.updateGroupService.execute(id, data);
  }

  @ApiBody({ type: InputUpdateGroupPermissionDto })
  @Patch('update-permissions/:id')
  async updateGroupPermission(
    @Param('id') id: number,
    @Body() data: { permissions: string[] },
  ): Promise<any> {
    return await this.updateGroupPermissionService.execute(id, data);
  }
}
