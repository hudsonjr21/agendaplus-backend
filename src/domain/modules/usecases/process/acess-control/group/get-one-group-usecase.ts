import { GroupRepository } from 'src/@core/domain/repositories/access-control/group-repository';
import { Group } from '../../../entities/group';
import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { GetOneGroupUseCase } from 'src/@core/domain/modules/usecases/access-control/group/get-one-group-usecase';

export class GetOneGroupUseCase {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(uuid: string): Promise<Group> {
    return await this.groupRepository.getOne(uuid);
  }
}

@Injectable()
export class GetOneGroupService {
  constructor(private readonly getOneGroupUseCase: GetOneGroupUseCase) {}

  async execute(uuid: string) {
    return await this.getOneGroupUseCase.execute(uuid).catch((err) => {
      throw new HttpException(
        'Erro buscar grupo especificado. ' + err.message,
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
