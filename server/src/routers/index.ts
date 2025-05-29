import { Router } from 'express'
import routerAuthentication from './authentication'
import routerTask from './tasks'
import  routerUtils from './utils'

const router = Router()
router.use('/v1/api/auth', routerAuthentication)
router.use('/v1/api/tasks', routerTask)
router.use('/v1/api/utils', routerUtils)

export default router
