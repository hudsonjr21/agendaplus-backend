import { Injectable } from '@nestjs/common';
import { Servico } from '../entities/servico.entity';
import {
  DeleteResult,
  Repository,
  FindOneOptions,
  Connection,
  Like,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { ServicoRepository } from 'src/domain/repositories/database/servico.repository';
import { ReadStream, createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class ServicoImpl implements ServicoRepository {
  constructor(
    @InjectRepository(Servico)
    private readonly servicoRepository: Repository<Servico>,
    private readonly connection: Connection,
  ) {}

  async delete(id: string): Promise<DeleteResult> {
    return await this.servicoRepository.softDelete(id);
  }

  async get(filters: Partial<Servico>): Promise<Servico | null> {
    return await this.servicoRepository.findOne({
      where: filters,
    } as FindOneOptions<Servico>);
  }

  async getAll(): Promise<Servico[]> {
    return await this.servicoRepository.find();
  }

  async save(servico: Partial<Servico>): Promise<Servico> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Adicionar log para verificar a existência de duplicatas
      console.log(
        `Verificando existência de serviço com nome: ${servico.nome}`,
      );
      const existingServico = await this.servicoRepository.findOne({
        where: { nome: servico.nome },
      });

      if (existingServico) {
        throw new ConflictException('Serviço com este nome já existe.');
      }

      const newServico = this.servicoRepository.create(servico);
      const savedServico = await queryRunner.manager.save(newServico);
      await queryRunner.commitTransaction();
      console.log(`Serviço salvo com sucesso: ${savedServico.id}`);
      return savedServico;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(`Erro ao salvar o serviço: ${error.message}`);
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Erro ao salvar o serviço.');
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    servico: Partial<Servico>,
    filters: Partial<Servico>,
  ): Promise<any> {
    return await this.servicoRepository.update(filters, servico);
  }

  async find(filters: any): Promise<Servico[]> {
    if (filters.nome) {
      filters.nome = Like(filters.nome); // Usar operador LIKE para busca parcial
    }
    return await this.servicoRepository.find({ where: filters });
  }

  async getStream(filters: Partial<Servico>): Promise<ReadStream> {
    const servico = await this.get(filters);
    if (!servico) {
      throw new Error('Serviço não encontrado');
    }
    const filePath = join(__dirname, 'path-to-your-file', `${servico.id}.txt`);
    return createReadStream(filePath);
  }
}
