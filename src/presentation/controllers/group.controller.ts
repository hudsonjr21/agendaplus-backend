import { UpdateGroupPermissionService } from '../services/update-group-permission.service';
import { CreateGroupService } from '../services/create-group.service';
import { UpdateGroupService } from '../services/update-group.service';
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
} from '@nestjs/common';
import { GetAllGroupsService } from '../services/get-all-groups.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteGroupService } from '../services/delete-group.service';
import { Query } from '@nestjs/common';
import { GetOneGroupService } from '../services/get-one-group.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  OutputGroupDto,
  OutputGroupNoRelationsDto,
} from '../dto/output-group.dto';
import {
  ErrorHandleDto,
  InternalServerErrorDto,
} from '../../../global/dto/output-global.dto';
import {
  InputCreateGroupDto,
  InputUpdateGroupDto,
  InputUpdateGroupPermissionDto,
} from '../dto/input-group.dto';

@ApiTags('Group')
@ApiBearerAuth()
@ApiResponse({ status: 400, type: ErrorHandleDto })
@ApiResponse({ status: 401, type: ErrorHandleDto })
@ApiResponse({ status: 500, type: InternalServerErrorDto })
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
