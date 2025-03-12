import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [__dirname + '/../src/infra/database/entities/*.{ts,js}'],
  migrations: [__dirname + '/../src/shared/migrations/*.{ts,js}'],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
});

export default AppDataSource;
