import { MigrationInterface, QueryRunner } from "typeorm";

export class Receipt1668698770966 implements MigrationInterface {
    name = 'Receipt1668698770966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "receipts" ("id" text NOT NULL, "domen" text NOT NULL, "sender_name" text NOT NULL, "recipients_name" text NOT NULL, "sender_address" text NOT NULL, "sender_phone_number" text NOT NULL, "track_number" text NOT NULL, "transfer_amount" numeric(10,2) NOT NULL, "transfer_fee" numeric(10,2) NOT NULL, "language" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5e8182d7c29e023da6e1ff33bfe" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "receipts"`);
    }

}
