import { Router } from 'express'
import { TasksController } from '~/controllers'
import asyncHandler from '~/helpers/asyncHandler'
import authentication from '~/middlewares/authentication'

const routerTask = Router()
routerTask.use(authentication)
routerTask.get('/get-lists', asyncHandler(TasksController.getLists))
routerTask.get('/get-chapters', asyncHandler(TasksController.getChapter))
routerTask.get('/get-musics', asyncHandler(TasksController.getMusics))
routerTask.get('/get-images', asyncHandler(TasksController.getImages))

export default routerTask
