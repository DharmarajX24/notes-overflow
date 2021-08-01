import express, {Request, Response, NextFunction} from "express"
import rootRouter from "./api/routes/index"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", rootRouter)

app.use((e: any, req: Request, res: Response, next: NextFunction) => {
  console.log(e)
  return res.status(500).json({code: "INTERNAL_SERVER_ERROR"})
})

export default app
