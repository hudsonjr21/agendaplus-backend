import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [
    String(process.env.TYPEORM_ENTITIES || 'src/**/*.entity{.ts,.js}'),
  ],
  migrations: [
    String(process.env.TYPEORM_MIGRATIONS || 'src/migration/**/*.ts'),
  ],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
