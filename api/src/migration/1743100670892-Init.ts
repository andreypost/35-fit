import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1743100670892 implements MigrationInterface {
    name = 'Init1743100670892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "scooter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "model" character varying NOT NULL, "rentalPricePerDay" numeric(10,2), "saleType" character varying NOT NULL DEFAULT 'sale', "price_id" uuid NOT NULL, CONSTRAINT "PK_d34b48695ebd552222c6e8ec675" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f3ef23f97e5f5ac777ca2380df" ON "scooter" ("deletedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_9f4db2a8e5d4ca951124cce10e" ON "scooter" ("price_id") `);
        await queryRunner.query(`CREATE TABLE "accessory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "price_id" uuid NOT NULL, CONSTRAINT "PK_e1ead99f958789eeebd86246d74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3ea5c7911689212230162bb1f2" ON "accessory" ("deletedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_67cc7d79289a35437ce076670a" ON "accessory" ("price_id") `);
        await queryRunner.query(`CREATE TABLE "price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "discount" numeric(5,2) NOT NULL DEFAULT '0', "taxRate" numeric(5,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL, "productType" character varying NOT NULL, CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d24f395db5e95e82ed6ccd26a" ON "price" ("deletedAt") `);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "productName" character varying NOT NULL, "quantity" integer NOT NULL, "productType" character varying NOT NULL, "productId" uuid NOT NULL, "order_id" uuid NOT NULL, "priceId" uuid, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f467883d929c5b88d0a0e04157" ON "order_item" ("deletedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_e9674a6053adbaa1057848cddf" ON "order_item" ("order_id") `);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "status" character varying NOT NULL, "finalTotalPrice" numeric(10,2) NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_00f95000fd14f568c8ee6b11ad" ON "order" ("deletedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_199e32a02ddc0f47cd93181d8f" ON "order" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "surname" character varying NOT NULL, "gender" character varying NOT NULL, "age" integer NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "emergencyName" character varying NOT NULL, "emergencyPhone" character varying NOT NULL, "grantedPrivileges" integer NOT NULL DEFAULT '0', "deniedPrivileges" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_92f09bd6964a57bb87891a2acf" ON "user" ("deletedAt") `);
        await queryRunner.query(`ALTER TABLE "scooter" ADD CONSTRAINT "FK_9f4db2a8e5d4ca951124cce10e7" FOREIGN KEY ("price_id") REFERENCES "price"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "accessory" ADD CONSTRAINT "FK_67cc7d79289a35437ce076670ad" FOREIGN KEY ("price_id") REFERENCES "price"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_109e564d34e07a71295b1696743" FOREIGN KEY ("priceId") REFERENCES "price"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_109e564d34e07a71295b1696743"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_e9674a6053adbaa1057848cddfa"`);
        await queryRunner.query(`ALTER TABLE "accessory" DROP CONSTRAINT "FK_67cc7d79289a35437ce076670ad"`);
        await queryRunner.query(`ALTER TABLE "scooter" DROP CONSTRAINT "FK_9f4db2a8e5d4ca951124cce10e7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92f09bd6964a57bb87891a2acf"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_199e32a02ddc0f47cd93181d8f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_00f95000fd14f568c8ee6b11ad"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e9674a6053adbaa1057848cddf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f467883d929c5b88d0a0e04157"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d24f395db5e95e82ed6ccd26a"`);
        await queryRunner.query(`DROP TABLE "price"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67cc7d79289a35437ce076670a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3ea5c7911689212230162bb1f2"`);
        await queryRunner.query(`DROP TABLE "accessory"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9f4db2a8e5d4ca951124cce10e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f3ef23f97e5f5ac777ca2380df"`);
        await queryRunner.query(`DROP TABLE "scooter"`);
    }

}
