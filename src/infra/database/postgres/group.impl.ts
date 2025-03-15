import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/domain/modules/entities/group.class';
import { GroupRepository } from 'src/domain/repositories/database/group-repository';
import { Repository, Like, In } from 'typeorm';

export class GroupImpl implements GroupRepository {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async getOne(id: number): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['permission_group'],
    });

    if (!group) {
      throw new Error(`Grupo com ID ${id} não encontrado`);
    }

    return group;
  }

  async getAll(
    payload: { description: string } | null,
    id: number[] | null,
  ): Promise<Group[]> {
    const query = this.groupRepository.createQueryBuilder('group');
    query.leftJoinAndSelect('group.permission_group', 'permission_group');
    query.leftJoinAndSelect('group.user_group', 'user_group');
    if (id) {
      query.andWhere({
        id: In(id),
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

  async delete(id: number): Promise<void> {
    await this.groupRepository.delete({
      id,
    });
  }
}
