export class CreateReceiptDto {
    public readonly id: string;
    public readonly domen: string;
    public readonly senderName: string;
    public readonly recipientsName: string;
    public readonly senderAddress: string;
    public readonly senderPhoneNumber: string;
    public readonly trackNumber: string;
    public readonly transferAmount: string;
    public readonly transferFee: string;
    public readonly language: string;
}