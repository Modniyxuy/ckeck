import { Global, Module } from '@nestjs/common';

import { LoggerService } from './logger.service';
import { BaseInjectEnum } from '../../../common/tokens/injection.token';

@Global()
@Module({
    providers: [
        {
            provide: BaseInjectEnum.LOGGER,
            useClass: LoggerService
        }
    ],
    exports: [
        {
            provide: BaseInjectEnum.LOGGER,
            useClass: LoggerService
        }
    ]
})
export class LoggerModule {}