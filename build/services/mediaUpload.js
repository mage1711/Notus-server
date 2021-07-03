"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const makeId_1 = require("../helpers/makeId");
exports.upload = multer_1.default({
    storage: multer_1.default.diskStorage({
        destination: 'public/images',
        filename: (_, file, callback) => {
            const name = makeId_1.makeId(16);
            callback(null, name + path_1.default.extname(file.originalname));
        },
    }),
    fileFilter: (_, file, callback) => {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
            callback(null, true);
        }
        else {
            callback(new Error('Not an image'));
        }
    },
});
//# sourceMappingURL=mediaUpload.js.map