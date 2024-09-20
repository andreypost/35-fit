import { MigrationInterface, QueryRunner } from "typeorm";

export class ExtendUsersSchemaWithNewFields1726831692897 implements MigrationInterface {
    name = 'ExtendUsersSchemaWithNewFields1726831692897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "surname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" character varying NOT NULL DEFAULT 'Non-binary'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "emergencyName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "emergencyPhone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emergencyPhone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emergencyName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "surname"`);
    }

}
