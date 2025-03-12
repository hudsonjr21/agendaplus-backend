import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseConnectionService } from './shared/databases/database-agendaplus-manager';
import { ClienteModule } from './domain/usecases/cliente/cliente.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConnectionService,
    }),
    // Importe outros módulos aqui
    ClienteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Adicione middlewares aqui, se necessário
  }
}
