import { NextFunction, Response } from 'express'
import { ForbiddenError } from '~/core/http'
import asyncHandler from '~/helpers/asyncHandler'
import keyModel from '~/models/Key'
import userModel from '~/models/User'
import { Http } from '~/type'
import { verifyAccessToken, verifyRefreshToken } from '~/utils/tokenKey.util'
import { MiddlewareAuthentication } from './authentication.middleware.type'

const COOKIES: MiddlewareAuthentication['Cookies'] = {
  client_id: 'client_id',
  access_token: 'access_token',
  refresh_token: 'refresh_token'
}

const authentication = asyncHandler(async (req: Http.RequestCutome, res: Response, next: NextFunction) => {
  const client_id = req.cookies[COOKIES.client_id]
  if (!client_id || client_id === 'undefined') {
    res.clearCookie('client_id')
    res.clearCookie('acces_token')
    res.clearCookie('refresh_token')
    throw new ForbiddenError({ metadata: 'CLIENT-ID không tìm thấy' })
  }
  const access_token = req.cookies[COOKIES.access_token]
  if (!access_token || access_token === 'undefined') {
    throw new ForbiddenError({ metadata: 'Không tìm thấy thông tin bảo mật' })
  }
  const user = await userModel.findOne({ _id: client_id })
  if (!user) throw new ForbiddenError({ metadata: 'Không tìm thấy user' })

  const keyStore = await keyModel.findOne({ user_id: user._id })
  if (!keyStore) throw new ForbiddenError({ metadata: 'Không tìm thấy key của user' })

  if (req.originalUrl === '/v1/api/auth/logout') {
    if (keyStore.user_id === client_id) {
      req.user = user
      req.force = req.body.force
      return next()
    }
  }

  if (req.originalUrl === '/v1/api/auth/refresh-token') {
    const refresh_token = req.cookies['refresh_token'] as string
    if (!refresh_token) return next(new ForbiddenError({ metadata: 'Không tìm thấy refresh_token' }))
    return verifyRefreshToken({ client_id, user, keyStore, token: refresh_token, key: keyStore.private_key, req, res, next })
  }

  if (access_token) {
    return verifyAccessToken({ client_id, user, keyStore, token: access_token, key: keyStore.public_key, req, res, next })
  }
})

export default authentication
