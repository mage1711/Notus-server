import multer, { FileFilterCallback } from "multer"
import path from "path"
import { makeId } from "../helpers/makeId"


export const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/images',
        filename: (_, file, callback) => {
            const name = makeId(16)
            callback(null, name + path.extname(file.originalname))
        },
    }),
    fileFilter: (_, file: any, callback: FileFilterCallback) => {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
            callback(null, true)
        } else {
            callback(new Error('Not an image'))
        }
    },
})