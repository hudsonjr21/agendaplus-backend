import { InjectRepository } from '@nestjs/typeorm';
import { GroupRepository } from 'src/@core/domain/repositories/access-control/group-repository';
import { Repository, Like, In } from 'typeorm';
import { Group } from '../entities';

export class GroupImpl implements GroupRepository {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async getOne(uuid: string): Promise<Group> {
    return await this.groupRepository.findOne({
      where: { uuid },
      relations: ['permission_group'],
    });
  }

  async getAll(
    payload: { description: string } | null,
    uuid: string[] | null,
  ): Promise<Group[]> {
    const query = this.groupRepository.createQueryBuilder('group');
    query.leftJoinAndSelect('group.permission_group', 'permission_group');
    query.leftJoinAndSelect('group.user_group', 'user_group');
    if (uuid) {
      query.andWhere({
        uuid: In(uuid),
      });
    }
    if (payload) {
      query.andWhere({
        ...(payload.description && {
          description: Like(`%${payload.description}%`),
        }),
      });
    }
    return await query.getMany();
  }

  async create(group: Group): Promise<Group> {
    return await this.groupRepository.save(group);
  }

  async update(group: Group): Promise<Group> {
    return await this.groupRepository.save(group);
  }

  async delete(uuid: string): Promise<void> {
    await this.groupRepository.delete({
      uuid,
    });
  }
}
