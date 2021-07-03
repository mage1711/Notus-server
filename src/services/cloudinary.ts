import cloudinary from "cloudinary"
import multer from "multer"
import config from "../services/config";
import cloudinaryStorage from 'multer-storage-cloudinary';

cloudinary.v2.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_KEY,
    api_secret: config.CLOUDINARY_SECRET
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary.v2,
    // params: {
    //     folder: 'Notus',
    //     allowed_formats: ['jpg', 'png'],
    // }
})

export const uploadCloud = multer({ storage: storage });
