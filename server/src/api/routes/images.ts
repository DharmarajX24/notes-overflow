import {Router} from "express"
import {mImagesUpload} from "../../init/multer";
import ImagesController from "../controllers/images.controller";

const router = Router()

router.get("/", (_req, res) => {
  return res.sendStatus(200)
})

router.post("/upload", mImagesUpload.single("image"), ImagesController.apiAddImage)

export default router
