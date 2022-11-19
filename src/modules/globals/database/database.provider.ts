import { DataSource } from 'typeorm';

import { TypeOrmConfigService } from '../config/typeorm-config.service';
import { BaseInjectEnum } from '../../../common/tokens/injection.token';

let appDataSourceCache: DataSource = null;

export const databaseProviders = [
    {
        provide: BaseInjectEnum.DATA_SOURCE,
        useFactory: async (typeOrmConfigService: TypeOrmConfigService) => {
            if (appDataSourceCache && appDataSourceCache.isInitialized) {
                return appDataSourceCache;
            }
            const dataSource = new DataSource(typeOrmConfigService.getOptions());
            const appDataSource = await dataSource.initialize();
            appDataSourceCache = appDataSource;
            return appDataSource;
        },
        inject: [TypeOrmConfigService]
    }
];
