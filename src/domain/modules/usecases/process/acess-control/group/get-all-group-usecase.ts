import { GroupRepository } from 'src/@core/domain/repositories/access-control/group-repository';
import { Group } from '../../../entities/group';
import { Group } from 'src/@core/infra/database/typeorm/entities/group.entity';
import { GetAllGroupUseCase } from 'src/@core/domain/modules/usecases/access-control/group/get-all-group-usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

export class GetAllGroupUseCase {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(
    payload: { description: string },
    uuid: string[] | null = null,
  ): Promise<Group[]> {
    return await this.groupRepository.getAll(payload, uuid);
  }
}

@Injectable()
export class GetAllGroupsService {
  constructor(private getAllGroupUseCase: GetAllGroupUseCase) {}

  async execute(query: { description: string }): Promise<Group[]> {
    return await this.getAllGroupUseCase.execute(query).catch((err) => {
      throw new HttpException(
        'Erro ao buscar grupos. ' + err.message,
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
