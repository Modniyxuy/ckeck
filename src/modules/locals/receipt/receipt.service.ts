import { Injectable, Inject } from '@nestjs/common';

import { Receipt } from './entities/receipt.entity';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { KeyIsIncorrect } from '../../../common/exceptions/management.exception';
import { ReceiptIdIsMissingException, ReceiptParameterIsMissingException } from '../../../common/exceptions/receipt.exception';
import { isObjectEmpty, dateFormatter } from '../../../common/utils';
import { UseCaseEnum } from '../../../common/tokens/injection.token';
import { ICreateReceiptUseCase, IDeleteOneReceiptUseCase, IFindOneReceiptUseCase, IReceiptRespone } from '../../../common/types';

import { KEY } from '../../../common/key';

@Injectable()
export class ReceiptService {
    public constructor(
        @Inject(UseCaseEnum.CREATE_RECEIPT)
        private readonly createReceiptUseCase: ICreateReceiptUseCase,
        @Inject(UseCaseEnum.FIND_ONE_RECEIPT)
        private readonly findOneReceiptUseCase: IFindOneReceiptUseCase,
        @Inject(UseCaseEnum.DELETE_ONE_RECEIPT)
        private readonly deleteOneReceiptUseCase: IDeleteOneReceiptUseCase
    ) {}

    public async createReceiptAndGetLink(key: string, dto: CreateReceiptDto): Promise<string> {
        if (!key || key !== KEY) throw new KeyIsIncorrect();
        if (isObjectEmpty(dto)) throw new ReceiptParameterIsMissingException();
        const receipt: Receipt = await this.createReceiptUseCase.execute(dto);
        const link: string = receipt.domen + '/' + receipt.id;

        return link;
    }

    public async getOneReceiptForSend(id: string): Promise<IReceiptRespone> {
        if (!id) throw new ReceiptIdIsMissingException();
        const receipt: Receipt = await this.findOneReceiptUseCase.execute(id);

        return {
            id: receipt.id,
            domen: receipt.domen,
            recipientsName: receipt.recipientsName,
            senderName: receipt.senderName,
            senderAddress: receipt.senderAddress,
            senderPhoneNumber: receipt.senderPhoneNumber,
            trackNumber: receipt.trackNumber,
            transferAmount: receipt.transferAmount,
            transferFee: receipt.transferFee,
            transferTotal: (parseFloat(receipt.transferAmount) + parseFloat(receipt.transferFee)).toFixed(2),
            date: dateFormatter(receipt.createdAt),
            language: receipt.language
        };
    }

    public async getManyReceipts(key: string): Promise<IReceiptRespone[]> {
        if (!key || key !== KEY) throw new KeyIsIncorrect();

        return {} as IReceiptRespone[];
    }

    public async deleteOneReceipt(key: string, id: string): Promise<boolean> {
        if (!key || key !== KEY) throw new KeyIsIncorrect();
        if (!id) throw new ReceiptIdIsMissingException();
        const result: boolean = await this.deleteOneReceiptUseCase.execute(id);

        return result;
    }
}