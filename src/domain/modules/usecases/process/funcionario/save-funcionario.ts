import {
  Injectable,
  Logger,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { FuncionarioImpl } from 'src/infra/database/postgres/funcionario.impl';
import { Funcionario } from 'src/infra/database/entities/funcionario.entity';
import { Like } from 'typeorm';

@Injectable()
export class SaveFuncionario {
  private readonly logger = new Logger(SaveFuncionario.name);

  constructor(private readonly funcionarioRepository: FuncionarioImpl) {}

  async getAllFuncionarios(): Promise<Funcionario[]> {
    this.logger.log('Fetching all employees');
    return this.funcionarioRepository.getAll();
  }

  async getFuncionarioById(id: number): Promise<Funcionario | null> {
    this.logger.log(`Fetching employee with ID: ${id}`);
    return this.funcionarioRepository.get({ id });
  }

  async createFuncionario(
    funcionario: Partial<Funcionario>,
  ): Promise<Funcionario> {
    this.logger.log(`Creating employee: ${JSON.stringify(funcionario)}`);
    const existingFuncionario = await this.funcionarioRepository.get({
      cpf: funcionario.cpf,
    });
    if (existingFuncionario) {
      throw new ConflictException('CPF já cadastrado.');
    }
    const createdFuncionario =
      await this.funcionarioRepository.save(funcionario);
    this.logger.log(`Employee created with ID: ${createdFuncionario.id}`);
    return createdFuncionario;
  }

  async updateFuncionario(
    id: number,
    funcionario: Partial<Funcionario>,
  ): Promise<any> {
    this.logger.log(`Updating employee with ID: ${id}`);
    const existingFuncionario = await this.funcionarioRepository.get({ id });
    if (!existingFuncionario) {
      throw new BadRequestException(`Funcionário com ID ${id} não encontrado.`);
    }

    const isDuplicateCPF = await this.funcionarioRepository.get({
      cpf: funcionario.cpf,
    });
    if (isDuplicateCPF && isDuplicateCPF.id !== id) {
      throw new ConflictException('CPF já cadastrado.');
    }

    const isDataEqual =
      JSON.stringify(existingFuncionario) ===
      JSON.stringify({ ...existingFuncionario, ...funcionario });
    if (isDataEqual) {
      throw new BadRequestException('Os dados já estão atualizados.');
    }

    await this.funcionarioRepository.update(funcionario as Funcionario, { id });
    this.logger.log(`Employee updated with ID: ${id}`);
    return { message: 'Funcionário atualizado com sucesso.' };
  }

  async deleteFuncionario(id: number): Promise<any> {
    this.logger.log(`Deleting employee with ID: ${id}`);
    const deleteResult = await this.funcionarioRepository.delete(id.toString());
    this.logger.log(`Employee deleted with ID: ${id}`);
    return deleteResult;
  }

  async searchFuncionarios(query: any): Promise<Funcionario[]> {
    this.logger.log(`Searching employees with query: ${JSON.stringify(query)}`);
    const { nome, cpf, nomeSocial, cidade, estado } = query;
    let filters = {};

    if (nome) {
      filters = [
        { nomeCompleto: Like(`%${nome}%`) },
        { nomeSocial: Like(`%${nome}%`) },
      ];
    }
    if (cpf) {
      filters = { ...filters, cpf };
    }
    if (nomeSocial) {
      filters = { ...filters, nomeSocial: Like(`%${nomeSocial}%`) };
    }
    if (cidade) {
      filters = { ...filters, cidade: Like(`%${cidade}%`) };
    }
    if (estado) {
      filters = { ...filters, estado: Like(`%${estado}%`) };
    }

    return await this.funcionarioRepository.find(filters);
  }
}
