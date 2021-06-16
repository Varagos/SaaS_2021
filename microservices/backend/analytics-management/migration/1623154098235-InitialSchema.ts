import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1623154098235 implements MigrationInterface {
    name = 'InitialSchema1623154098235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "keyword" ("keyword_id" SERIAL NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_f00b35bb604c3606d626650308c" UNIQUE ("description"), CONSTRAINT "PK_9e52fada2f5845ddd63bd9a1497" PRIMARY KEY ("keyword_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" integer NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("question_id" integer NOT NULL, "title" character varying NOT NULL, "text" text NOT NULL, "date" TIMESTAMP NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_7c755ccdc03ae2b6206ff00363a" PRIMARY KEY ("question_id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("comment_id" integer NOT NULL, "text" text NOT NULL, "date" TIMESTAMP NOT NULL, "question_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_6a9f9bf1cf9a09107d3224a0e9a" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`CREATE TABLE "question_keywords_keyword" ("questionQuestionId" integer NOT NULL, "keywordKeywordId" integer NOT NULL, CONSTRAINT "PK_f5ab3e3aa477bdad1a6f069eaad" PRIMARY KEY ("questionQuestionId", "keywordKeywordId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_155f204ae212be45283fbdb9b3" ON "question_keywords_keyword" ("questionQuestionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2fa9944b420be953821b635d81" ON "question_keywords_keyword" ("keywordKeywordId") `);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_82c53e1db067ff3d6ef17dfd5c4" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_432b109924ae5c5b604c7558445" FOREIGN KEY ("question_id") REFERENCES "question"("question_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" ADD CONSTRAINT "FK_155f204ae212be45283fbdb9b3f" FOREIGN KEY ("questionQuestionId") REFERENCES "question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" ADD CONSTRAINT "FK_2fa9944b420be953821b635d81c" FOREIGN KEY ("keywordKeywordId") REFERENCES "keyword"("keyword_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" DROP CONSTRAINT "FK_2fa9944b420be953821b635d81c"`);
        await queryRunner.query(`ALTER TABLE "question_keywords_keyword" DROP CONSTRAINT "FK_155f204ae212be45283fbdb9b3f"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_432b109924ae5c5b604c7558445"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_82c53e1db067ff3d6ef17dfd5c4"`);
        await queryRunner.query(`DROP INDEX "IDX_2fa9944b420be953821b635d81"`);
        await queryRunner.query(`DROP INDEX "IDX_155f204ae212be45283fbdb9b3"`);
        await queryRunner.query(`DROP TABLE "question_keywords_keyword"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "keyword"`);
    }

}
