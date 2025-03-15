import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/domain/repositories/database/user-repository';
import { Repository } from 'typeorm';
import { User } from '../entities';

export class UserImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getOne(id: number, status: boolean): Promise<User> {
    return await this.userRepository.findOneOrFail({
      where: { id, status },
      relations: ['user_group'],
    });
  }

  async getOneByCPF(cpf: string): Promise<User> {
    return await this.userRepository.findOneOrFail({
      where: { cpf },
      relations: ['user_group'],
    });
  }

  async getAll(status: boolean, name: string, cpf: string): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');
    query.leftJoinAndSelect('user.user_group', 'user_group');
    if (status) {
      query.andWhere({
        status,
      });
    }
    if (name) {
      query.andWhere('name LIKE :name', { name: `%${name}%` });
    }
    if (cpf) {
      query.andWhere('cpf LIKE :cpf', { cpf: `%${cpf}%` });
    }
    return await query.getMany();
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    this.userRepository.delete({ id });
  }
}
