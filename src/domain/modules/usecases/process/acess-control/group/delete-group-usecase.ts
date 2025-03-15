import { GroupRepository } from 'src/domain/repositories/database/group-repository';
import { GetOneGroupUseCase } from './get-one-group-usecase';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class DeleteGroupUseCase {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly getOneGroupUseCase: GetOneGroupUseCase,
  ) {}

  async execute(id: number): Promise<void> {
    const group = await this.getOneGroupUseCase.execute(id);
    if (!group) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    if (group.user_group && group.user_group.length > 0) {
      throw new HttpException(
        `O grupo não pode ser deletado devido à existência de grupos e usuários. Remova as permissões de grupo dos usuários antes de tentar excluir o grupo.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.groupRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        `Erro ao deletar grupo no banco de dados: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export class DeleteGroupService {
  constructor(private readonly deleteGroupUseCase: DeleteGroupUseCase) {}

  async execute(id: number) {
    try {
      await this.deleteGroupUseCase.execute(id);
    } catch (err) {
      throw new HttpException(
        `Erro ao deletar grupo. ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
