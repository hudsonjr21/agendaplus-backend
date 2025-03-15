import { GroupRepository } from 'src/domain/repositories/database/group-repository';
import { Group } from 'src/domain/modules/entities/group.class';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class GetOneGroupUseCase {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(id: number): Promise<Group> {
    return await this.groupRepository.getOne(id);
  }
}

export class GetOneGroupService {
  constructor(private readonly getOneGroupUseCase: GetOneGroupUseCase) {}

  async execute(id: number) {
    return await this.getOneGroupUseCase.execute(id).catch((err) => {
      throw new HttpException(
        'Erro buscar grupo especificado. ' + err.message,
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
