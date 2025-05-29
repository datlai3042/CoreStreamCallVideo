import { NextFunction, Response } from 'express'
import { OK } from '~/core/http'
import { UtilsService } from '~/services'
import { Http } from '~/type'

class UtilsControllers {
  static async stream(req: Http.RequestCutome, res: Response, next: NextFunction) {
     new OK({ metadata: await UtilsService.stream(req, res, next) }).send(res)
  }
}

export default UtilsControllers
