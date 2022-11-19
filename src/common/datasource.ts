import { DataSource } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';

config();

export default new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],
    migrations: [join(__dirname, '..', 'modules' , 'globals', 'database', 'migrations', '*.{ts,js}')],
    migrationsTableName: 'migrations', 
    migrationsRun: false
});