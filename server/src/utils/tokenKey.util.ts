import { randomBytes } from 'crypto'
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AuthFailedError, BadRequestError, ForbiddenError, ResponseError } from '~/core/http'
import { KeyManagerDocument } from '~/models/Key'
import { UserDocument } from '~/models/User'
import { Application, Http } from '~/type'

export const generatePaidToken = <PayloadJWT extends object>(payload: PayloadJWT, key: Application.Token.Key): Application.Token.PairToken => {
  const access_token = jwt.sign(payload, key.public_key, { expiresIn: process.env.EXPIRE_ACCESS_TOKEN || '1d'})
  const refresh_token = jwt.sign(payload, key.private_key, { expiresIn: process.env.EXPIRE_REFRESH_TOKEN  || '7d'})
  if (!access_token || !refresh_token) throw new ResponseError({ metadata: 'Lỗi do tạo key' })
  return { access_token, refresh_token }
}

export const generatePaidKey = (): Application.Token.Key => {
  const public_key = randomBytes(64).toString('hex')
  const private_key = randomBytes(64).toString('hex')
  return { public_key, private_key }
}

export const generateCodeVerifyToken = (): string => {
  const code_verify_refresh_token = randomBytes(20).toString('hex')
  return code_verify_refresh_token
}

export const createPayload = (user: UserDocument) => {
  const { _id, user_email, user_roles } = user

  const payload = {
    _id,
    user_email,
    user_roles
  }

  return payload
}

export type ParamVerifyAT = {
  user: UserDocument
  keyStore: KeyManagerDocument
  client_id: string
  token: string
  key: string
  req: Http.RequestCutome
  res: Response
  next: NextFunction
}

export type ParamVerifyATSocket = Omit<ParamVerifyAT, 'req' | 'res' | 'next'>
export const verifyAccessToken = ({ user, keyStore, client_id, token, key, req, res, next }: ParamVerifyAT) => {
  jwt.verify(token, key, (error, decode) => {
    if (error) {
      if (req.originalUrl === '/v1/api/auth/logout') {
        req.user = user
        return next()
      }
      return next(new AuthFailedError({ metadata: 'Token không đúng' }))
    }

    const payload = decode as Application.Token.PayloadJWT
    if (payload._id.toString() !== client_id) return next(new BadRequestError({ metadata: 'Token không thuộc về user' }))
    req.user = user
    req.key = keyStore
  })
  return next()
}

export const verifyAccessTokenSocket = ({ user, keyStore, client_id, token, key }: ParamVerifyATSocket) => {
  let checkAT = false
  jwt.verify(token, key, (error, decode) => {
    if (error) {
      return checkAT
    }

    const payload = decode as Application.Token.PayloadJWT
    if (payload._id.toString() !== client_id) return checkAT
    checkAT = true
  })
  return checkAT
}

export const verifyRefreshToken = ({ user, keyStore, client_id, token, key, req, res, next }: ParamVerifyAT) => {
  const force = req.body.force

  jwt.verify(token, key, (error, decode) => {
    console.log({ token, key, user })
    if (error) {
      return next(new ForbiddenError({ metadata: 'Token không đúng123' }))
    }

    const payload = decode as Application.Token.PayloadJWT
    if (keyStore.refresh_token_used.includes(token)) {
      return next(new ForbiddenError({ metadata: 'Token đã được sử dụng' }))
    }
    if (payload._id.toString() !== client_id) return next(new BadRequestError({ metadata: 'Token không thuộc về user' }))
    req.user = user
    req.key = keyStore
    req.refresh_token = token
    return next()
  })
}

export const fillDataKeyModel = (user: UserDocument, public_key: string, private_key: string, refresh_token: string) => {
  const modelKeyQuery = {
    user_id: user?._id
  }

  const modelKeyUpdate = {
    $set: { public_key, private_key, refresh_token }
  }

  const modelKeyOption = { new: true, upsert: true }

  return { modelKeyQuery, modelKeyUpdate, modelKeyOption }
}

export const getCookieValueHeader = (CookieName: string, CookiesString: string) => {
  const cookieSplit = CookiesString?.split(';')
  const cookies: { [key: string]: string } = {}
  cookieSplit?.forEach((pair) => {
    const [name, value] = pair.split('=').map((item) => item.trim())
    cookies[name] = value
  })

  return cookies[CookieName]
}
