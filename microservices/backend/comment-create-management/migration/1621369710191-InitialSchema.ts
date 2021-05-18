import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1621369710191 implements MigrationInterface {
    name = 'InitialSchema1621369710191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("comment_id" SERIAL NOT NULL, "text" text NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "question_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_6a9f9bf1cf9a09107d3224a0e9a" PRIMARY KEY ("comment_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
