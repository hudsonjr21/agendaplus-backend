import { GroupRepository } from 'src/@core/domain/repositories/access-control/group-repository';
import { Group } from '../../../entities/group';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateGroupUseCase } from 'src/@core/domain/modules/usecases/access-control/group/create-group-usecase';

export class CreateGroupUseCase {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(group: Group): Promise<Group> {
    return await this.groupRepository.create(group);
  }
}

@Injectable()
export class CreateGroupService {
  constructor(private readonly createGroupUseCase: CreateGroupUseCase) {}
  async execute(dataGroup: {
    title: string;
    description: string;
    status: boolean;
    accessLevel: string;
  }) {
    return await this.createGroupUseCase
      .execute({
        title: dataGroup.title,
        description: dataGroup.description,
        status: dataGroup.status,
        access_level: dataGroup.accessLevel,
      })
      .catch((err) => {
        throw new HttpException(
          'Erro ao criar grupo. ' + err.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
