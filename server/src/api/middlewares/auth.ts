import {NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken"

export const authenticateRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return next(401)

    const authToken = authHeader.split(" ")
    if (authToken[0] !== "Bearer") return next(401)

    req.decodedToken = jwt.verify(authToken[1], process.env.SUPABASE_JWT_SECRET!)
    console.log(req.decodedToken)
    return next()
  } catch (e) {
    if (e.name === "TokenExpiredError") return res.status(403).json({
      error: "Forbidden",
    })
    if (e.name === "JsonWebTokenError") return res.status(401).json({error: "Unauthorized"})
    return next(401)
  }
}
