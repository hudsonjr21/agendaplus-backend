import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Group } from 'src/domain/modules/entities/group.class';
import { GroupRepository } from 'src/domain/repositories/database/group-repository';

@Injectable()
export class GetAllGroupUseCase {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(
    payload: { description: string },
    id: number[] | null = null,
  ): Promise<Group[]> {
    return await this.groupRepository.getAll(payload, id);
  }
}

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
