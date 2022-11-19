import { Controller, Get, Post, Body, Param, Delete, Render, Res } from '@nestjs/common';
import { Response } from 'express';

import { ReceiptService } from './receipt.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { ILinkResponse, IPanelResponse, IReceiptRespone } from '../../../common/types';

import { KEY } from '../../../common/key';

@Controller()
export class ReceiptController {
    public constructor(
        private readonly receiptService: ReceiptService
    ) {}

    @Get(':id')
    public async getOneReceipt(
        @Res() response: Response,
        @Param('id') id: string
    ): Promise<void> {
        const receipt: IReceiptRespone = await this.receiptService.getOneReceiptForSend(id);
        
        return response.render(
            receipt.language,
            {
                ...receipt,
                language: receipt.language === 'en' ? true : false,
                layout: 'index'
            }
        );
    }

    @Get('panel/:key')
    public async createReceiptPanel(
        @Res() response: Response,
        @Param('key') key: string
    ): Promise<void> {
        const receipts: IReceiptRespone[] = await this.receiptService.getManyReceipts(key);

        return response.render('', {
            key: KEY,
            layout: 'panel'
        });
    }

    @Post('panel/:key')
    public async createReceipt(
        @Res() response: Response,
        @Param('key') key: string,
        @Body() body: CreateReceiptDto
    ): Promise<void> {
        const link: string = await this.receiptService.createReceiptAndGetLink(key, body);

        return response.render('', {
            link,
            layout: 'link'
        });
    }

    @Delete('panel/:key/:id')
    public async deleteOneReceipt(
        @Param('key') key: string,
        @Param('id') id: string
    ): Promise<boolean> {
        const result: boolean = await this.receiptService.deleteOneReceipt(key, id);

        return result;
    }
}