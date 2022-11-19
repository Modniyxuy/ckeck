import { Injectable } from '@nestjs/common';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class TypeOrmConfigService {
    public constructor(
        private readonly configService: ConfigService
    ) {}

    public getOptions(): DataSourceOptions {
        const typeOrmOptions: DataSourceOptions = {
            type: 'postgres',
            host: this.configService.get<string>('DATABASE_HOST'),
            port: this.configService.get<number>('DATABASE_PORT'),
            username: this.configService.get<string>('DATABASE_USERNAME'),
            password: this.configService.get<string>('DATABASE_PASSWORD'),
            database: this.configService.get<string>('DATABASE'),
            entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],
            migrations: [join(__dirname, '..', 'database', 'migrations', '*.{ts,js}')],
            migrationsTableName: 'migrations', 
            synchronize: false,
            migrationsRun: false
        };

        return typeOrmOptions;
    }

    public static getAsyncOptions(): TypeOrmModuleAsyncOptions {
        const typeOrmAsyncOptions: TypeOrmModuleAsyncOptions = {
            useFactory: async (
                typeOrmConfigService: TypeOrmConfigService
            ) => typeOrmConfigService.getOptions(),
            inject: [TypeOrmConfigService]
        };

        return typeOrmAsyncOptions;
    }
}