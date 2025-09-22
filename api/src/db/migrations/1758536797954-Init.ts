import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1758536797954 implements MigrationInterface {
    name = 'Init1758536797954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "scooter" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "scooter_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "model" character varying NOT NULL, "rental_price_per_day" numeric(10,2), "saleType" character varying NOT NULL DEFAULT 'sale', "price_id" uuid NOT NULL, CONSTRAINT "PK_df038cb32616a3f79fcc3f897fb" PRIMARY KEY ("scooter_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bcac1e9e42dbd0b78650e780c5" ON "scooter" ("deleted_at") `);
        await queryRunner.query(`CREATE INDEX "idx_scooter_price_id" ON "scooter" ("price_id") `);
        await queryRunner.query(`CREATE TABLE "accessory" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "accessory_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price_id" uuid NOT NULL, CONSTRAINT "PK_f5a45774011d173224229b7d634" PRIMARY KEY ("accessory_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7dbdaec395fa248a3c2a7a0293" ON "accessory" ("deleted_at") `);
        await queryRunner.query(`CREATE INDEX "idx_accessory_price_id" ON "accessory" ("price_id") `);
        await queryRunner.query(`CREATE TABLE "price" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "price_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "discount" numeric(5,2) NOT NULL DEFAULT '0', "taxRate" numeric(5,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL, "product_type" character varying NOT NULL, CONSTRAINT "PK_06dfa501a623d0e1e2f7e17aa78" PRIMARY KEY ("price_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8bfdcefcb1def77577a150023d" ON "price" ("deleted_at") `);
        await queryRunner.query(`CREATE TABLE "order_item" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "order_item_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_name" character varying NOT NULL, "quantity" integer NOT NULL, "product_type" character varying NOT NULL, "product_id" uuid NOT NULL, "order_id" uuid NOT NULL, "price_id" uuid NOT NULL, CONSTRAINT "PK_f91441b7e69922a51a0d2917107" PRIMARY KEY ("order_item_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_76c7fdeb1dee75389547bec3cf" ON "order_item" ("deleted_at") `);
        await queryRunner.query(`CREATE INDEX "idx_order_item_order_id" ON "order_item" ("order_id") `);
        await queryRunner.query(`CREATE INDEX "idx_order_item_price_id" ON "order_item" ("price_id") `);
        await queryRunner.query(`CREATE TABLE "order" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "order_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "final_total_price" numeric(10,2) NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_58998c5eaeaacdd004dec8b5d86" PRIMARY KEY ("order_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4e529e216c7ffb66d2427fb13e" ON "order" ("deleted_at") `);
        await queryRunner.query(`CREATE INDEX "idx_order_user_id" ON "order" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "user_image" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "user_image_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image_url" character varying NOT NULL, "display_order" integer NOT NULL DEFAULT '0', "mime_type" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_9fe783886a4cfca47cc2b54420f" PRIMARY KEY ("user_image_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_63b2dc0a577ece04ad97a5bffa" ON "user_image" ("deleted_at") `);
        await queryRunner.query(`CREATE INDEX "idx_user_image_user_id" ON "user_image" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "surname" character varying NOT NULL, "gender" character varying NOT NULL, "age" integer NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "emergency_name" character varying NOT NULL, "emergency_phone" character varying NOT NULL, "granted_privileges" integer NOT NULL DEFAULT '0', "denied_privileges" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_22b81d3ed19a0bffcb660800f4" ON "user" ("deleted_at") `);
        await queryRunner.query(`ALTER TABLE "scooter" ADD CONSTRAINT "FK_9f4db2a8e5d4ca951124cce10e7" FOREIGN KEY ("price_id") REFERENCES "price"("price_id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "accessory" ADD CONSTRAINT "FK_67cc7d79289a35437ce076670ad" FOREIGN KEY ("price_id") REFERENCES "price"("price_id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id") REFERENCES "order"("order_id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_96061445fe14aa45cdfc1770e2f" FOREIGN KEY ("price_id") REFERENCES "price"("price_id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_image" ADD CONSTRAINT "FK_60db7aa78ee9dfbdbd4c7311a05" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_image" DROP CONSTRAINT "FK_60db7aa78ee9dfbdbd4c7311a05"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_96061445fe14aa45cdfc1770e2f"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_e9674a6053adbaa1057848cddfa"`);
        await queryRunner.query(`ALTER TABLE "accessory" DROP CONSTRAINT "FK_67cc7d79289a35437ce076670ad"`);
        await queryRunner.query(`ALTER TABLE "scooter" DROP CONSTRAINT "FK_9f4db2a8e5d4ca951124cce10e7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_22b81d3ed19a0bffcb660800f4"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_image_user_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63b2dc0a577ece04ad97a5bffa"`);
        await queryRunner.query(`DROP TABLE "user_image"`);
        await queryRunner.query(`DROP INDEX "public"."idx_order_user_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4e529e216c7ffb66d2427fb13e"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP INDEX "public"."idx_order_item_price_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_order_item_order_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_76c7fdeb1dee75389547bec3cf"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8bfdcefcb1def77577a150023d"`);
        await queryRunner.query(`DROP TABLE "price"`);
        await queryRunner.query(`DROP INDEX "public"."idx_accessory_price_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7dbdaec395fa248a3c2a7a0293"`);
        await queryRunner.query(`DROP TABLE "accessory"`);
        await queryRunner.query(`DROP INDEX "public"."idx_scooter_price_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bcac1e9e42dbd0b78650e780c5"`);
        await queryRunner.query(`DROP TABLE "scooter"`);
    }

}
