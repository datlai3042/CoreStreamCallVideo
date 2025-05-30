import { Router } from 'express'
import routerAuthentication from './authentication'
import routerTask from './tasks'
import routerUtils from './utils'
import { routerUser } from '~/modules/users/routers'

const router = Router()
router.use('/v1/api/auth', routerAuthentication)
router.use('/v1/api/tasks', routerTask)
router.use('/v1/api/utils', routerUtils)
router.use('/v1/api/users', routerUser)

export default router
