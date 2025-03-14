import { Injectable } from '@nestjs/common';
import { Caixa } from '../entities/caixa.entity';
import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CaixaImpl {
  constructor(
    @InjectRepository(Caixa)
    private readonly caixaRepository: Repository<Caixa>,
    private readonly connection: Connection,
  ) {}

  async updateSaldo(caixa: Partial<Caixa>): Promise<Caixa> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const updatedCaixa = await queryRunner.manager.save(Caixa, caixa);
      await queryRunner.commitTransaction();
      return updatedCaixa;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async createCaixa(caixa: Partial<Caixa>): Promise<Caixa> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newCaixa = this.caixaRepository.create(caixa);
      const savedCaixa = await queryRunner.manager.save(newCaixa);
      await queryRunner.commitTransaction();
      return savedCaixa;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async save(caixa: Partial<Caixa>): Promise<Caixa> {
    return await this.caixaRepository.save(caixa);
  }

  async getAllCaixas(): Promise<Caixa[]> {
    return await this.caixaRepository.find();
  }

  async getCaixaById(id: number): Promise<Caixa | null> {
    return await this.caixaRepository.findOne({ where: { id } });
  }

  async updateCaixa(id: number, caixa: Partial<Caixa>): Promise<Caixa> {
    await this.caixaRepository.update(id, caixa);
    const updatedCaixa = await this.getCaixaById(id);
    if (!updatedCaixa) {
      throw new Error(`Caixa com ID ${id} não encontrada`);
    }
    return updatedCaixa;
  }

  async deleteCaixa(id: number): Promise<void> {
    await this.caixaRepository.delete(id);
  }
}
