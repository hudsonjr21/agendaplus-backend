import { Group } from 'src/domain/modules/entities/group.class';
export interface GroupRepository {
  getOne(id: number): Promise<Group>;
  getAll(
    payload: { description: string } | null,
    id: number[] | null,
  ): Promise<Group[]>;
  create(group: Group): Promise<Group>;
  update(group: Group): Promise<Group>;
  delete(id: number): Promise<void>;
}
