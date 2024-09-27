import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDetailsEntity1727440150096 implements MigrationInterface {
    name = 'UserDetailsEntity1727440150096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "userDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "earnings" character varying NOT NULL, "country" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_35f9ec44d0772d64d68f5417c6b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "userDetails"`);
    }

}
