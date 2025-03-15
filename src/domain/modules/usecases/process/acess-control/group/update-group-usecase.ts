import { GroupRepository } from 'src/domain/repositories/database/group-repository';
import { GetOneGroupUseCase } from './get-one-group-usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Group } from 'src/domain/modules/entities/group.class';

@Injectable()
export class UpdateGroupUseCase {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly getOneGroupUseCase: GetOneGroupUseCase,
  ) {}

  async execute(group: Group): Promise<Group> {
    return await this.getOneGroupUseCase
      .execute(group.id!)
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

export class UpdateGroupService {
  constructor(private readonly updateGroupUseCase: UpdateGroupUseCase) {}

  async execute(
    id: number,
    dataGroup: {
      description: string;
      status: boolean;
    },
  ) {
    return await this.updateGroupUseCase
      .execute({
        id,
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
