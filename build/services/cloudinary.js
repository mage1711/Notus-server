"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCloud = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../services/config"));
const multer_storage_cloudinary_1 = __importDefault(require("multer-storage-cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: config_1.default.CLOUDINARY_NAME,
    api_key: config_1.default.CLOUDINARY_KEY,
    api_secret: config_1.default.CLOUDINARY_SECRET
});
const storage = multer_storage_cloudinary_1.default({
    cloudinary: cloudinary_1.default.v2,
    // params: {
    //     folder: 'Notus',
    //     allowed_formats: ['jpg', 'png'],
    // }
});
exports.uploadCloud = multer_1.default({ storage: storage });
//# sourceMappingURL=cloudinary.js.map