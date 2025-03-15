import { UserRepository } from '../../../../repositories/access-control/user-repository';
import { User } from '../../../entities/user';
import { PublishInQueueRepository } from '../../../../repositories/global/publish-in-queue-repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ModifyStatusUserUseCase } from 'src/@core/domain/modules/usecases/access-control/user/modify-status-user-usecase';

export class ModifyStatusUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly publishInQueueRepository: PublishInQueueRepository,
  ) {}

  async execute(id: number, status: boolean): Promise<User> {
    const userUpdated = await this.userRepository.update({
      id,
      status,
    });
    const formatPayloadBackoffice = {
      cpf: userUpdated.cpf,
      subsystem: 2,
      status: status,
    };
    this.publishInQueueRepository.publish(
      'backoffice',
      'key.status-user.subsystem',
      formatPayloadBackoffice,
    );
    return userUpdated;
  }
}

@Injectable()
export class ModifyStatusUserService {
  constructor(
    private readonly modifyStatusUserUseCase: ModifyStatusUserUseCase,
  ) {}

  async execute(userId: number, status: boolean) {
    return this.modifyStatusUserUseCase.execute(userId, status).catch((err) => {
      throw new HttpException(
        'Erro ao atualizar status do usuário. ' + err.message,
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
