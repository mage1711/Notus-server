"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationNpm1626008016515 = void 0;
class migrationNpm1626008016515 {
    constructor() {
        this.name = 'migrationNpm1626008016515';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "posts" ADD "bodyPreview" character varying`);
            yield queryRunner.query(`ALTER TABLE "posts" ADD "mediaLink" character varying NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "mediaLink"`);
            yield queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "bodyPreview"`);
        });
    }
}
exports.migrationNpm1626008016515 = migrationNpm1626008016515;
//# sourceMappingURL=1626008016515-migration-npm.js.map