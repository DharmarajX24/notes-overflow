import {Router} from "express"
import DirectoriesRouter from "./directories"
import {authenticateRequest} from "../middlewares/auth";

const router = Router()

router.use(authenticateRequest)
router.use("/directories", DirectoriesRouter)

export default router
