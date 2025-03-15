import { GroupRepository } from 'src/domain/repositories/database/group-repository';
import { GetOneGroupUseCase } from './get-one-group-usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteGroupUseCase {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly getOneGroupUseCase: GetOneGroupUseCase,
  ) {}

  async execute(id: number): Promise<void> {
    const group = await this.getOneGroupUseCase.execute(id);
    if (group.user_group.length > 0) {
      throw new Error(
        `O grupo não pode ser deletado devido a existencia de grupos e usuários. Remova as permissões de grupo dos usuários antes de tentar excluir o grupo.`,
      );
    }
    await this.groupRepository.delete(id);
  }
}
// export class DeleteGroupService {
//   constructor(private readonly deleteGroupUseCase: DeleteGroupUseCase) {}

//   async execute(id: number) {
//     this.deleteGroupUseCase.execute(id).catch((err) => {
//       throw new HttpException(
//         'Erro ao deletar grupo. ' + err.message,
//         HttpStatus.BAD_REQUEST,
//       );
//     });
//   }
// }
