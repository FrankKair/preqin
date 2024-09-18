import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Investor, Commitment } from './entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'preqin_db',
  synchronize: true,
  logging: true,
  entities: [Investor, Commitment],
  subscribers: [],
  migrations: [],
});
