import { NextFunction, Response } from 'express'
import { omit } from 'lodash'
import { AuthFailedError } from '~/core/http'
import { Http } from '~/type'
import { TRegisterBody } from './authentication.type'
import { checkDataUser, checkMailAndCreateUser, handleCookieAndKeyRefreshToken, handleKeyAndCookie } from './authentication.utils'
import { UserDocument } from '~/models/User'
import keyModel from '~/models/Key'
import { clearCookieAuth } from '~/utils/cookie.util'
import { Types } from 'mongoose'

class AuthService {
  static async register(req: Http.RequestCutome<TRegisterBody>, res: Response, next: NextFunction) {
    const { email, password } = req.body

    if (!email || !password) throw new AuthFailedError({ metadata: 'Request thiếu các field bắt buốc' })

    const { user } = await checkMailAndCreateUser({ email, password })
    // await createANotification({ user_id: user?._id, type: 'System', core: { message: 'Cảm ơn bạn đã tạo tài khoản' } })

    const { access_token, expireToken, refresh_token, expireCookie } = await handleKeyAndCookie({ user, res })

    return {
      user: omit(user.toObject(), ['user_password']),
      token: { access_token, refresh_token },
      expireToken,
      client_id: user._id,
      expireCookie
    }
  }
  static async login(req: Http.RequestCutome<TRegisterBody>, res: Response, next: NextFunction) {
    const { email, password } = req.body
    const { user } = await checkDataUser({ email, password })

    const { access_token, expireToken, refresh_token, expireCookie } = await handleKeyAndCookie({ user, res })
    // await createANotification({ user_id: user?._id, type: 'System', core: { message: 'Chào mừng bạn quay trở lại' } })
    return {
      user: omit(user.toObject(), ['user_password']),
      token: { access_token, refresh_token },
      expireCookie,
      expireToken,
      client_id: user._id
    }
  }
  static async logout(req: Http.RequestCutome<TRegisterBody>, res: Response, next: NextFunction) {
    const user = req.user as UserDocument
    const { force } = req
    // await createANotification({
    //       user_id: user?._id as Types.ObjectId,
    //       type: 'System',
    //       core: { message: 'Đăng xuất thành công' }
    // })
    clearCookieAuth({ res })

    await keyModel.findOneAndDelete({ user_id: user._id })

    return force ? { message: 'Bắt buộc logout' } : { message: 'Logout thành công' }
  }
  static async refreshToken(req: Http.RequestCutome<TRegisterBody>, res: Response, next: NextFunction) {
    const { refresh_token } = req
    const { user } = req
    const { access_token, expireToken, new_refresh_token, expireCookie } = await handleCookieAndKeyRefreshToken({
      user: user as UserDocument,
      refresh_token_used: refresh_token as string,
      res
    })
    return {
      user: omit(user?.toObject(), ['user_password']),
      token: { access_token, refresh_token: new_refresh_token },
      expireToken,
      expireCookie,
      client_id: (user?._id as Types.ObjectId).toString()
    }
  }
}

export default AuthService
