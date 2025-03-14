import * as dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis de ambiente do .env
import { DataSource } from 'typeorm';
import { ENTITIES } from './src/infra/database/entities';

export const AppDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION as 'postgres', // Defina 'postgres' diretamente, pois é o valor no .env
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ENTITIES,
  migrations: [
    process.env.TYPEORM_MIGRATIONS || 'dist/src/shared/migrations/*.js',
  ],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'false',
  logging: true,
});
