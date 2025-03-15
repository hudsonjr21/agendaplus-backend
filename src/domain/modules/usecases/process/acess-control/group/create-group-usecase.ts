import { GroupRepository } from 'src/domain/repositories/database/group-repository';
import { Group } from 'src/domain/modules/entities/group.class';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateGroupUseCase {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(group: Group): Promise<Group> {
    return await this.groupRepository.create(group);
  }
}
// export class CreateGroupService {
//   constructor(private readonly createGroupUseCase: CreateGroupUseCase) {}

//   async execute(dataGroup: {
//     title: string;
//     description: string;
//     status: boolean;
//     accessLevel: string;
//   }) {
//     return await this.createGroupUseCase
//       .execute({
//         title: dataGroup.title,
//         description: dataGroup.description,
//         status: dataGroup.status,
//         access_level: dataGroup.accessLevel,
//       })
//       .catch((err) => {
//         throw new HttpException(
//           'Erro ao criar grupo. ' + err.message,
//           HttpStatus.BAD_REQUEST,
//         );
//       });
//   }
// }
