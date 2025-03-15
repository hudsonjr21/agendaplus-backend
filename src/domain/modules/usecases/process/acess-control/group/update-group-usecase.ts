import { GroupRepository } from 'src/@core/domain/repositories/access-control/group-repository';
import { Group } from '../../../entities/group';
import { GetOneGroupUseCase } from './get-one-group-usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateGroupUseCase } from 'src/@core/domain/modules/usecases/access-control/group/update-group-usecase';

export class UpdateGroupUseCase {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly getOneGroupUseCase: GetOneGroupUseCase,
  ) {}

  async execute(group: Group): Promise<Group> {
    return await this.getOneGroupUseCase
      .execute(group.uuid)
      .then((data) => {
        const upData = this.groupRepository.update({
          ...data,
          description: group.description,
          status: group.status,
        });
        return upData;
      })
      .catch(() => {
        throw new Error(
          'Não foi encontrado o grupo especificado para atualização',
        );
      });
  }
}

@Injectable()
export class UpdateGroupService {
  constructor(private readonly updateGroupUseCase: UpdateGroupUseCase) {}
  async execute(
    uuid: string,
    dataGroup: {
      description: string;
      status: boolean;
    },
  ) {
    return await this.updateGroupUseCase
      .execute({
        uuid,
        description: dataGroup.description,
        status: dataGroup.status,
      })
      .catch((err) => {
        throw new HttpException(
          'Erro ao atualizar grupo. ' + err.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
