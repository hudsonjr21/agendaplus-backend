import { GetOneUserByCPFUseCase } from './get-one-user-by-cpf-usecase';
import { UserRepository } from '../../../../repositories/access-control/user-repository';
import { ReceiveUser, SubsystemId } from '../../../inputs/receive-user';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InputUserDto } from '../dto/input-user.dto';
import { CreateOrUpdateUserBackOfficeUseCase } from 'src/@core/domain/modules/usecases/access-control/user/create-or-update-user-backoffice-usecase';

enum CARGO_USER {
  DEFAULT = 1,
  MASTER = 2,
}

enum ACCESS_GROUP_USER {
  TOTAL = 1,
  NONE = 2,
}

export class CreateOrUpdateUserBackOfficeUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly getOneUserByCPFUseCase: GetOneUserByCPFUseCase,
  ) {}

  async execute(receiveUser: ReceiveUser | any) {
    const cpfReplace = receiveUser.cpf.replace(/[^\d]+/g, '');
    const isNecessaryToSave = (): boolean => {
      return receiveUser.subsystemsId.some((subsystem: SubsystemId) => {
        return subsystem.id === 2;
      });
    };
    const user = await this.getOneUserByCPFUseCase
      .execute(cpfReplace)
      .catch(() => {
        return null;
      });
    const user_group_ids = user?.user_group.map((user_group) => {
      if (user_group.id !== 1 && user_group.id !== 2) {
        return { id: user_group.id };
      }
    });

    if (!isNecessaryToSave() && !user) return;

    if (user) {
      // atualização
      await this.userRepository.create({
        id: user.id,
        uuid: receiveUser.uuid,
        cpf: cpfReplace,
        email: receiveUser.email,
        identification: receiveUser.identification,
        name: receiveUser.name,
        phone: receiveUser.phone,
        status: isNecessaryToSave() ? true : false,
        user_group: [
          ...user_group_ids,
          {
            id:
              receiveUser.roleId.id === CARGO_USER.MASTER
                ? ACCESS_GROUP_USER.TOTAL
                : ACCESS_GROUP_USER.NONE,
          },
        ],
      });
    } else {
      await this.userRepository.create({
        ...receiveUser,
        id: null,
        user_group: [
          {
            id:
              receiveUser.roleId === CARGO_USER.MASTER
                ? ACCESS_GROUP_USER.TOTAL
                : ACCESS_GROUP_USER.NONE,
          },
        ],
      });
    }
  }
}

@Injectable()
export class CreateOrUpdateUserService {
  constructor(
    private readonly createOrUpdateUserBackOfficeUseCase: CreateOrUpdateUserBackOfficeUseCase,
  ) {}
  async execute(receiveUser: InputUserDto | any) {
    return await this.createOrUpdateUserBackOfficeUseCase
      .execute(receiveUser)
      .catch((err) => {
        throw new HttpException(
          'Erro ao criar ou atualizar o usuario. ' + err.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
