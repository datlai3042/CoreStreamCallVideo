import { NextFunction, Response } from 'express'
import { OK } from '~/core/http'
import { AuthService } from '~/services'
import { Http } from '~/type'

class AuthController {
  static async register(req: Http.RequestCutome, res: Response, next: NextFunction) {
    new OK({ metadata: await AuthService.register(req, res, next) }).send(res)
  }

  static async login(req: Http.RequestCutome, res: Response, next: NextFunction) {
    new OK({ metadata: await AuthService.login(req, res, next) }).send(res)
  }

  static async logout(req: Http.RequestCutome, res: Response, next: NextFunction) {
    new OK({ metadata: await AuthService.logout(req, res, next) }).send(res)
  }

  static async refreshToken(req: Http.RequestCutome, res: Response, next: NextFunction) {
    new OK({ metadata: await AuthService.refreshToken(req, res, next) }).send(res)
  }
}

export default AuthController
