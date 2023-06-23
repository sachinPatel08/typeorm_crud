const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class User1687425810883 {

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE User ADD password STRING`)
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE User DROP COLUMN password`)
    }

}
