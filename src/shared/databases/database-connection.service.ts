import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DataBaseConnectionService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'postgres',
      host: this.configService.get<string>('TYPEORM_HOST'),
      port: Number(this.configService.get<number>('TYPEORM_PORT')),
      username: this.configService.get<string>('TYPEORM_USERNAME'),
      password: this.configService.get<string>('TYPEORM_PASSWORD'),
      database: this.configService.get<string>('TYPEORM_DATABASE'),
      entities: [
        String(
          this.configService.get<string>('TYPEORM_ENTITIES') ||
            'src/**/*.entity{.ts,.js}',
        ),
      ],
      migrations: [
        String(
          this.configService.get<string>('TYPEORM_MIGRATIONS') ||
            'src/migration/**/*.ts',
        ),
      ],
      synchronize: this.configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
      maxQueryExecutionTime: 1000,
      cache: false,
    };
  }
}
