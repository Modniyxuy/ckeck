import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { create, engine } from 'express-handlebars';
import { join } from 'path';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { BaseInjectEnum } from './common/tokens/injection.token';
import { ILogger } from './common/types';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get<ConfigService>(ConfigService);
    const loggerService = app.get<ILogger>(BaseInjectEnum.LOGGER);

    app.use(helmet());
    app.use(cookieParser());

    app.enableCors({
        // origin: [`http://localhost:${configService.get<number>('SERVER_PORT')}`, configService.get<string>('APP_DOMAIN_ADDRESS')],
        origin: '*',
        methods: 'GET,PUT,PATCH,POST,DELETE',
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204
    });

    app.useGlobalFilters(new HttpExceptionFilter(loggerService));
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'public/views'));
    app.engine('hbs', engine({
        extname: 'hbs',
        layoutsDir: join(__dirname, '..', 'public/views'),
        partialsDir: join(__dirname, '..', 'public/views')
    }));
    app.setViewEngine('hbs');

    await app.listen(configService.get<number>('SERVER_PORT'));

    if (configService.get<string>('NODE_ENV') !== 'production') {
        loggerService.log(
            'Bootstrap',
            `🚀 Server is listening on port ${configService.get<number>('SERVER_PORT')}`
        );
    } else {
        loggerService.log(
            'Bootstrap',
            `🚀 Application is running on: ${await app.getUrl()}`
        );
    }
}

bootstrap();