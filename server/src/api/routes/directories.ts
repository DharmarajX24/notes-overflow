import {Router} from "express"
import DirectoriesController from "../controllers/directories.controller";
import {mImagesUpload} from "../../init/multer";

const router = Router()

router.get("/", DirectoriesController.apiListDirectories)

router.post("/create", DirectoriesController.apiAddDirectory)

router.post("/:directoryId", mImagesUpload.single("image"), DirectoriesController.apiAddImage)

export default router
