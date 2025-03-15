import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servico } from 'src/infra/database/entities/servico.entity';
import { SaveServico } from './save-servico';
import { ServicoImpl } from 'src/infra/database/postgres/servico.impl';
import { ServicoController } from 'src/presentation/controllers/servico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Servico])],
  providers: [SaveServico, ServicoImpl],
  controllers: [ServicoController],
  exports: [SaveServico],
})
export class ServicoModule {}
