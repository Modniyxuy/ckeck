import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('receipts')
export class Receipt {
    @PrimaryColumn({ name: 'id', type: 'text' })
    public id: string;

    @Column({ name: 'domen', type: 'text' })
    public domen: string;

    @Column({ name: 'sender_name', type: 'text' })
    public senderName: string;

    @Column({ name: 'recipients_name', type: 'text' })
    public recipientsName: string;

    @Column({ name: 'sender_address', type: 'text' })
    public senderAddress: string;

    @Column({ name: 'sender_phone_number', type: 'text' })
    public senderPhoneNumber: string;

    @Column({ name: 'track_number', type: 'text' })
    public trackNumber: string;

    @Column({ name: 'transfer_amount', type: 'numeric', precision: 10, scale: 2 })
    public transferAmount: string;

    @Column({ name: 'transfer_fee', type: 'numeric', precision: 10, scale: 2 })
    public transferFee: string;

    @Column({ name: 'language', type: 'text' })
    public language: string;

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    public updatedAt: Date;
}