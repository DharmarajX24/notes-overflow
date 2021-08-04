import multer from "multer"
import {v4} from "uuid"
import {join, extname} from "path"

const mImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "..", "public"))
  },
  filename: function (req, file, cb) {
    cb(null, `image_${v4() + extname(file.originalname)}`)
  },
})

export const mImagesUpload = multer({
  storage: mImageStorage,
  fileFilter(req, file, cb) {
    const ext = extname(file.originalname)
    if ([".png", ".jpeg", ".jpg"].includes(ext)) {
      cb(null, true)
    } else {
      //@ts-ignore
      req.fileValidationError = "Invalid file format"
      //@ts-ignore
      return cb(new Error('Invalid Image Format'), false)
    }
  },
  //TODO: check size of existing images
  limits: {fileSize: 8 * 1000 * 1000}
})
