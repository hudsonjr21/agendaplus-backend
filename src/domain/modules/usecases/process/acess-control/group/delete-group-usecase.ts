import { GroupRepository } from 'src/@core/domain/repositories/access-control/group-repository';
import { GetOneGroupUseCase } from './get-one-group-usecase';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DeleteGroupUseCase } from 'src/@core/domain/modules/usecases/access-control/group/delete-group-usecase';

export class DeleteGroupUseCase {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly getOneGroupUseCase: GetOneGroupUseCase,
  ) {}

  async execute(uuid: string): Promise<void> {
    const group = await this.getOneGroupUseCase.execute(uuid);
    if (group.user_group.length > 0) {
      throw new Error(
        `O grupo não pode ser deletado devido a existencia de relações entre 
        grupos e usuários. Remova as permissões de grupo dos usuários antes de 
        tentar excluir o grupo.`,
      );
    }
    await this.groupRepository.delete(uuid);
  }
}
@Injectable()
export class DeleteGroupService {
  constructor(private readonly deleteGroupUseCase: DeleteGroupUseCase) {}
  async execute(uuid: string) {
    this.deleteGroupUseCase.execute(uuid).catch((err) => {
      throw new HttpException(
        'Erro ao deletar grupo. ' + err.message,
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
