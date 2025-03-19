import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742407996559 implements MigrationInterface {
    name = 'Init1742407996559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "scooter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "model" character varying NOT NULL, "rentalPricePerDay" numeric(10,2), "saleType" character varying NOT NULL DEFAULT 'sale', "price_id" uuid NOT NULL, CONSTRAINT "PK_d34b48695ebd552222c6e8ec675" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accessory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "price_id" uuid NOT NULL, CONSTRAINT "PK_e1ead99f958789eeebd86246d74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "discount" numeric(5,2) NOT NULL DEFAULT '0', "taxRate" numeric(5,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL, "productType" character varying NOT NULL, CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "productName" character varying NOT NULL, "quantity" integer NOT NULL, "productType" character varying NOT NULL, "productId" uuid NOT NULL, "order_id" uuid, "priceId" uuid, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "status" character varying NOT NULL, "finalTotalPrice" numeric(10,2) NOT NULL, "user_id" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "surname" character varying NOT NULL, "gender" character varying NOT NULL, "age" integer NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "emergencyName" character varying NOT NULL, "emergencyPhone" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "scooter" ADD CONSTRAINT "FK_9f4db2a8e5d4ca951124cce10e7" FOREIGN KEY ("price_id") REFERENCES "price"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accessory" ADD CONSTRAINT "FK_67cc7d79289a35437ce076670ad" FOREIGN KEY ("price_id") REFERENCES "price"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_109e564d34e07a71295b1696743" FOREIGN KEY ("priceId") REFERENCES "price"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_109e564d34e07a71295b1696743"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_e9674a6053adbaa1057848cddfa"`);
        await queryRunner.query(`ALTER TABLE "accessory" DROP CONSTRAINT "FK_67cc7d79289a35437ce076670ad"`);
        await queryRunner.query(`ALTER TABLE "scooter" DROP CONSTRAINT "FK_9f4db2a8e5d4ca951124cce10e7"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "price"`);
        await queryRunner.query(`DROP TABLE "accessory"`);
        await queryRunner.query(`DROP TABLE "scooter"`);
    }

}
