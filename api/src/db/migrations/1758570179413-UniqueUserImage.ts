import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueUserImage1758570179413 implements MigrationInterface {
    name = 'UniqueUserImage1758570179413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_image" ADD CONSTRAINT "user_image_display_order" UNIQUE ("user_id", "display_order")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_image" DROP CONSTRAINT "user_image_display_order"`);
    }

}
