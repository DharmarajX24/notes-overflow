import {Router} from "express"
import ImagesRouter from "./images"

const router = Router()

router.use("/images", ImagesRouter)

export default router
