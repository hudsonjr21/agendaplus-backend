import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741962657360 implements MigrationInterface {
  name = 'Migration1741962657360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transacao" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "transacao" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "transacao" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "caixa" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "caixa" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "caixa" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "caixa" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "caixa" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "caixa" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "transacao" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "transacao" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "transacao" DROP COLUMN "created_at"`);
  }
}
