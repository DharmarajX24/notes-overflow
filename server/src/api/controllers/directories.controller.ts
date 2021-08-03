import {NextFunction, Request, Response} from "express"
import DirectoriesDAO from "../../dao/directoriesDAO";
import {parseTextFromImage, uploadToSupabase} from "../../handlers/image";
import {extname} from "path"

export default class DirectoriesController {
  static apiAddDirectory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {name, description} = req.body
      if (!name || !description) return next(new Error('Bad Request'))
      if (name.length > 30 || description.length > 500) return next(new Error('Bad Request'))
      const {data, error} = await DirectoriesDAO.addDirectory(req.decodedToken.sub, name, description)
      console.log(data, error)
      if (error) {
        return next(error)
      }
      return res.status(200).json({data: data![0].id})
    } catch (e) {
      console.log(e)
      return next(e)
    }
  }

  static apiListDirectories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.decodedToken.sub
      const {data, error} = await DirectoriesDAO.listDirectories(userId)
      if (error) {
        return next(error)
      }
      return res.status(200).json({data})
    } catch (e) {
      return next(e)
    }
  }

  static apiAddImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {directoryId} = req.params
      const file = req.file
      const text = await parseTextFromImage(file?.path!)
      const {data, error} = await DirectoriesDAO.addImage(req.decodedToken.sub, directoryId, {
        name: file?.filename!,
        text: text!
      })
      if (error) return next(error)
      // TODO: Index text in Meilisearch
      await uploadToSupabase(file?.path!, `${req.decodedToken.sub}/image_${data![0].id}${extname(file?.filename!)}`)
      return res.status(200).json({data: file?.filename})
    } catch (e) {
      return next(e)
    }
  }
}
