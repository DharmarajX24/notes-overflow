import {Request, Response, NextFunction} from "express"
import ImagesDAO from "../../dao/imagesDAO";

export default class ImagesController {
  static apiAddImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.file)
      const file = req.file
      const {data, error} = await ImagesDAO.addImage("tempUserId", {name: file?.filename!, addedAt: Date.now(), text: "Some text"})
      console.log(data)
      console.log(error)
      return res.sendStatus(200)
    } catch (e) {
      return next(e)
    }
  }
}
