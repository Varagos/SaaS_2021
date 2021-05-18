import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1621369623020 implements MigrationInterface {
    name = 'InitialSchema1621369623020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question" ("question_id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" text NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, CONSTRAINT "PK_7c755ccdc03ae2b6206ff00363a" PRIMARY KEY ("question_id"))`);
        await queryRunner.query(`CREATE TABLE "keyword" ("keyword_id" SERIAL NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_f00b35bb604c3606d626650308c" UNIQUE ("description"), CONSTRAINT "PK_9e52fada2f5845ddd63bd9a1497" PRIMARY KEY ("keyword_id"))`);
        await queryRunner.query(`CREATE TABLE "question_keywords_keyword" ("questionQuestionId" integer NOT NULL, "keywordKeywordId" integer NOT NULL, CONSTRAINT "PK_f5ab3e3aa477bdad1a6f069eaad" PRIMARY KEY ("questionQuestionId", "keywordKeywordId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_155f204ae212be45283fbdb9b3" ON "question_keywords_keyword" ("questionQuestionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2fa9944b420be953821b635d81" ON "question_keywords_keyword" ("keywordKeywordId") `);
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" ADD CONSTRAINT "FK_155f204ae212be45283fbdb9b3f" FOREIGN KEY ("questionQuestionId") REFERENCES "question"("question_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" ADD CONSTRAINT "FK_2fa9944b420be953821b635d81c" FOREIGN KEY ("keywordKeywordId") REFERENCES "keyword"("keyword_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" DROP CONSTRAINT "FK_2fa9944b420be953821b635d81c"`);
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" DROP CONSTRAINT "FK_155f204ae212be45283fbdb9b3f"`);
        await queryRunner.query(`DROP INDEX "IDX_2fa9944b420be953821b635d81"`);
        await queryRunner.query(`DROP INDEX "IDX_155f204ae212be45283fbdb9b3"`);
        await queryRunner.query(`DROP TABLE "question_keywords_keyword"`);
        await queryRunner.query(`DROP TABLE "keyword"`);
        await queryRunner.query(`DROP TABLE "question"`);
    }

}
