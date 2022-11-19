import { ArgumentsHost, Catch, ExceptionFilter, Inject } from '@nestjs/common';
import { Response } from 'express';
import { EMPTY, Observable } from 'rxjs';

import { Exception } from '../exceptions';
import { buildExceptionTypesMap } from '../utils';
import { BaseInjectEnum } from '../tokens/injection.token';
import { ILogger } from '../types';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    public constructor(
        @Inject(BaseInjectEnum.LOGGER) private readonly logger: ILogger
    ) {}

    public catch(exception: Exception, argumentsHost: ArgumentsHost): Observable<any> {
        if (argumentsHost.getType() === 'http') {
            const response = argumentsHost.switchToHttp().getResponse<Response>();
            const typesMap = buildExceptionTypesMap();
            let status = typesMap.get(exception.type) || 500;

            if (status === 500) {
                this.logger.error('SERVER', exception.message);
            }

            response.status(status).send({
                status: status,
                message: exception.message
            });

            return EMPTY;
        }
    }
}