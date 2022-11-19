import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';
import { CreateReceiptUseCase } from './use-cases/create-receipt.use-case';
import { FindOneReceiptUseCase } from './use-cases/find-one-receipt.use-case';
import { DeleteOneReceiptUseCase } from './use-cases/delete-one-receipt.use-case';
import { Receipt } from './entities/receipt.entity';
import { DatabaseContext } from '../../../common/database.context';
import { BaseInjectEnum, UseCaseEnum } from '../../../common/tokens/injection.token';

@Module({
    imports: [
        TypeOrmModule.forFeature([Receipt])
    ],
    controllers: [ReceiptController],
    providers: [
        {
            provide: BaseInjectEnum.DATABASE_CONTEXT,
            useClass: DatabaseContext
        },
        {
            provide: UseCaseEnum.CREATE_RECEIPT,
            useClass: CreateReceiptUseCase
        },
        {
            provide: UseCaseEnum.FIND_ONE_RECEIPT,
            useClass: FindOneReceiptUseCase
        },
        {
            provide: UseCaseEnum.DELETE_ONE_RECEIPT,
            useClass: DeleteOneReceiptUseCase
        },
        ReceiptService
    ]
})
export class ReceiptModule {}