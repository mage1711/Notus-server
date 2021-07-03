import cloudinary from "cloudinary"
import multer from "multer"
import config from "../services/config";
import cloudinaryStorage from 'multer-storage-cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary.v2,
    // params: {
    //     folder: 'Notus',
    //     allowed_formats: ['jpg', 'png'],
    // }
})

export const uploadCloud = multer({ storage: storage });
