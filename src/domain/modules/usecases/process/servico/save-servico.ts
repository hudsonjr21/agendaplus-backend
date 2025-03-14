import {
  Injectable,
  Logger,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { ServicoImpl } from 'src/infra/database/postgres/servico.impl';
import { Servico } from 'src/infra/database/entities/servico.entity';

@Injectable()
export class SaveServico {
  private readonly logger = new Logger(SaveServico.name);

  constructor(private readonly servicoRepository: ServicoImpl) {}

  async getAllServicos(): Promise<Servico[]> {
    this.logger.log('Fetching all serviços');
    return this.servicoRepository.getAll();
  }

  async getServicoById(id: number): Promise<Servico | null> {
    this.logger.log(`Fetching serviço with ID: ${id}`);
    return this.servicoRepository.get({ id });
  }

  async createServico(servico: Partial<Servico>): Promise<Servico> {
    this.logger.log(`Creating serviço: ${JSON.stringify(servico)}`);
    try {
      const createdServico = await this.servicoRepository.save(servico);
      this.logger.log(`Servico created with ID: ${createdServico.id}`);
      return createdServico;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Erro ao criar o serviço.');
      }
      throw error;
    }
  }

  async updateServico(id: number, servico: Partial<Servico>): Promise<any> {
    this.logger.log(`Updating serviço with ID: ${id}`);
    const existingServico = await this.servicoRepository.get({ id });
    if (!existingServico) {
      throw new BadRequestException(`Serviço com ID ${id} não encontrado.`);
    }

    const isDataEqual =
      JSON.stringify(existingServico) ===
      JSON.stringify({ ...existingServico, ...servico });
    if (isDataEqual) {
      throw new BadRequestException('Os dados já estão atualizados.');
    }

    await this.servicoRepository.update(servico as Servico, { id });
    this.logger.log(`Serviço updated with ID: ${id}`);
    return { message: 'Serviço atualizado com sucesso.' };
  }

  async deleteServico(id: number): Promise<any> {
    this.logger.log(`Deleting serviço with ID: ${id}`);
    const deleteResult = await this.servicoRepository.delete(id.toString());
    this.logger.log(`Serviço deleted with ID: ${id}`);
    return deleteResult;
  }

  async searchServicos(query: any): Promise<Servico[]> {
    this.logger.log(`Searching serviços with query: ${JSON.stringify(query)}`);
    const { descricao } = query;
    let filters = {};

    if (descricao) {
      filters = { descricao: descricao };
    }

    return await this.servicoRepository.find(filters);
  }
}
