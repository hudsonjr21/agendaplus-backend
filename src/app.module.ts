import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { DomainModule } from './domain/domain.module';
import { PresentationModule } from './presentation/presentation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseConnectionService } from './shared/databases/database-agendaplus-manager';
import { EmptyBodyMiddleware } from './presentation/middleware/intercept-data.middleware';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConnectionService,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DomainModule,
    PresentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EmptyBodyMiddleware).forRoutes('*');
  }
}
