import {Request, Response, NextFunction} from "express"

export default class ImagesController {
  static apiAddImage = (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.file)
      return res.sendStatus(200)
    } catch (e) {
      return next(e)
    }
  }
}
