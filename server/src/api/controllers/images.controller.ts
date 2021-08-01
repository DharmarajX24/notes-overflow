import {Request, Response, NextFunction} from "express"
import ImagesDAO from "../../dao/imagesDAO";
import vision from "../../init/vision";

export default class ImagesController {
  static apiAddImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.file)
      const file = req.file
      await processImage(file!)
      const {data, error} = await ImagesDAO.addImage("tempUserId", {name: file?.filename!, addedAt: Date.now(), text: "Some text"})
      console.log(data)
      console.log(error)
      return res.sendStatus(200)
    } catch (e) {
      return next(e)
    }
  }
}


async function processImage(file: Express.Multer.File){
    const [result] = await vision.textDetection(file.path);
    const detections = result.textAnnotations;
    console.log("Text:");
    const finale = detections?.find(ent =>ent.locale != '')?.description?.replace('\n','');
    console.log(finale);
    return detections?.find(ent =>ent.locale != '')?.description?.replace('\n','');
}