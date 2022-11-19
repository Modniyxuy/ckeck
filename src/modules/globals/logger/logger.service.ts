import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ILogger } from '../../../common/types';

@Injectable()
export class LoggerService extends Logger implements ILogger {
    public constructor(
        private readonly configService: ConfigService
    ) {
        super();
    }

    public debug(context: string, message: string): void {
        if (this.configService.get<string>('NODE_ENV') !== 'production') {
            super.debug(message, context);
        }
    }

    public log(context: string, message: string): void {
        super.log(message, context);
    }

    public error(context: string, message: string, trace?: string): void {
        super.error(message, trace, context);
    }

    public warn(context: string, message: string): void {
        super.warn(message, context);
    }
    
    public verbose(context: string, message: string): void {
        if (this.configService.get<string>('NODE_ENV') !== 'production') {
            super.verbose(message, context);
        }
    }
}