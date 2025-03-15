import { UserRepository } from 'src/domain/repositories/database/user-repository';
import { GetAllGroupUseCase } from '../group/get-all-group-usecase';
import { GetOneUserUseCase } from './get-one-user-usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserPermissionUseCase {
  constructor(
    private readonly getAllGroupUseCase: GetAllGroupUseCase,
    private readonly getOneUserUseCase: GetOneUserUseCase,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number, dataPermission: { permissions: string[] }) {
    const groups = await this.getAllGroupUseCase.execute(
      { description: '' },
      dataPermission.permissions.map(Number), // Converte string[] para number[]
    );

    const user = await this.getOneUserUseCase.execute(id, true);

    if (!user) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    try {
      await this.userRepository.update({
        ...user,
        user_group: groups,
      });

      return;
    } catch (error) {
      throw new HttpException(
        `Erro ao atualizar permissões do usuário: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export class UpdateUserPermissionService {
  constructor(
    private readonly updateUserPermissionUseCase: UpdateUserPermissionUseCase,
  ) {}

  async execute(id: number, dataPermission: { permissions: string[] }) {
    try {
      return await this.updateUserPermissionUseCase.execute(id, dataPermission);
    } catch (err) {
      throw new HttpException(
        `Erro ao atualizar permissões do usuário. ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
