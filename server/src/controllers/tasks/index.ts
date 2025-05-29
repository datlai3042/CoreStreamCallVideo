import { NextFunction, Response } from 'express'
import { OK } from '~/core/http'
import TasksService from '~/services/tasks'
import { Http } from '~/type'

class TasksController {
  static async getLists(req: Http.RequestCutome, res: Response, next: NextFunction) {
    new OK({ metadata: await TasksService.getList(req, res, next) }).send(res)
  }

  static async getChapter(req: Http.RequestCutome, res: Response, next: NextFunction) {
    new OK({ metadata: await TasksService.getChapter(req, res, next) }).send(res)
  }

  static async getMusics(req: Http.RequestCutome, res: Response, next: NextFunction) {
    new OK({ metadata: await TasksService.getMusic(req, res, next) }).send(res)
  }

  static async getImages(req: Http.RequestCutome, res: Response, next: NextFunction) {
    new OK({ metadata: await TasksService.getImages(req, res, next) }).send(res)
  }
}

export default TasksController
