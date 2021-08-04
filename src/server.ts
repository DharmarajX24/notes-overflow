import express, {NextFunction, Request, Response} from "express"
import cors from "cors"
import {createServer} from "http"
import rootRouter from "./api/routes/index"

declare module 'express-serve-static-core' {
  interface Request {
    decodedToken: any
  }
}

const app = express()

app.use(cors({origin: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", rootRouter)

app.use((e: any, req: Request, res: Response, next: NextFunction) => {
  console.log(e)
  return res.status(500).json({code: "INTERNAL_SERVER_ERROR"})
})

const server = createServer(app)

export {app, server}
