import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPrivileges1742758445899 implements MigrationInterface {
    name = 'AddUserPrivileges1742758445899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_order"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "grantedPrivileges" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deniedPrivileges" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deniedPrivileges"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "grantedPrivileges"`);
        await queryRunner.query(`CREATE INDEX "idx_order" ON "order" ("user_id") `);
    }

}
