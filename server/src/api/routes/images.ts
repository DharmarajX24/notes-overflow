import {Router} from "express"

const router = Router()

router.get("/", (_req, res) => {
  return res.sendStatus(200)
})

router.post("/index")

export default router
