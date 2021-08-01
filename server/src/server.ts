import express from "express"
import rootRouter from "./api/routes/index"

const app = express()

app.use("/", rootRouter)

export default app
