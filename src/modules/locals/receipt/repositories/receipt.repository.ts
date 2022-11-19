import { InsertResult, DeleteResult } from 'typeorm';

import { Receipt } from '../entities/receipt.entity';
import { CreateReceiptDto } from '../dto/create-receipt.dto';
import { IReceiptRepository } from '../../../../common/types';

export const ReceiptRepository: IReceiptRepository = {
    async insertReceipt(dto: CreateReceiptDto): Promise<Receipt> {
        const receipt: Receipt = await this.createQueryBuilder('receipt')
            .insert().into('receipts').values(dto)
            .returning('*').execute().then((data: InsertResult) => data.generatedMaps[0]);

        return receipt;
    },

    async findOneById(id: string): Promise<Receipt> {
        const receipt: Receipt = await this.createQueryBuilder('receipt')
            .where('id = :id', { id }).getOne();

        return receipt;
    },

    async deleteOneById(id: string): Promise<boolean> {
        const result: boolean = await this.createQueryBuilder('receipt')
            .delete().from('receipts').where('id = :id', { id })
            .execute().then((data: DeleteResult) => data.affected > 0 ? true : false);

        return result;
    }
}