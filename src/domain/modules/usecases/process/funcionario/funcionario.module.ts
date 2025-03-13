import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from 'src/infra/database/entities/funcionario.entity';
import { SaveFuncionario } from './save-funcionario';
import { FuncionarioImpl } from 'src/infra/database/postgres/funcionario.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Funcionario])],
  providers: [SaveFuncionario, FuncionarioImpl],
  exports: [SaveFuncionario],
})
export class FuncinarioModule {}
