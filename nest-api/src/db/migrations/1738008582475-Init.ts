import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1738008582475 implements MigrationInterface {
    name = 'Init1738008582475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "scooter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "model" character varying NOT NULL, "rentalPricePerDay" numeric(10,2), "saleType" character varying NOT NULL DEFAULT 'sale', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "priceIdId" uuid, CONSTRAINT "PK_d34b48695ebd552222c6e8ec675" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accessory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "priceIdId" uuid, CONSTRAINT "PK_e1ead99f958789eeebd86246d74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "discount" numeric(5,2) NOT NULL DEFAULT '0', "taxRate" numeric(5,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL, "productType" character varying NOT NULL, CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productName" character varying NOT NULL, "quantity" integer NOT NULL, "productType" character varying NOT NULL, "productId" uuid NOT NULL, "orderId" uuid, "priceId" uuid, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "finalTotalPrice" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "surname" character varying NOT NULL, "gender" character varying NOT NULL, "age" integer NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "emergencyName" character varying NOT NULL, "emergencyPhone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "scooter" ADD CONSTRAINT "FK_152b9c72a3272296fe5c5d4202e" FOREIGN KEY ("priceIdId") REFERENCES "price"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accessory" ADD CONSTRAINT "FK_8a2376cc7e6d5ee3f2f0659150a" FOREIGN KEY ("priceIdId") REFERENCES "price"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_109e564d34e07a71295b1696743" FOREIGN KEY ("priceId") REFERENCES "price"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_109e564d34e07a71295b1696743"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "accessory" DROP CONSTRAINT "FK_8a2376cc7e6d5ee3f2f0659150a"`);
        await queryRunner.query(`ALTER TABLE "scooter" DROP CONSTRAINT "FK_152b9c72a3272296fe5c5d4202e"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "price"`);
        await queryRunner.query(`DROP TABLE "accessory"`);
        await queryRunner.query(`DROP TABLE "scooter"`);
    }

}
