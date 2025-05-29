import { NextFunction, Response } from 'express'
import path from 'path'
import { Http } from '~/type'
import fs from 'fs'
import { AuthFailedError } from '~/core/http'

const lists = [
  { name: 'Code', isComplete: false, author: 'Kuro' },
  { name: 'Sleep', isComplete: false, author: 'Đạt' },
  { name: 'Eat', isComplete: false, author: 'Kuro' },
  { name: 'Alive', isComplete: false, author: 'Kuro' }
]

const chapter = [
  { name: 'Code', isComplete: false, author: 'Kuro' },
  { name: 'Sleep', isComplete: false, author: 'Đạt' },
  { name: 'Eat', isComplete: false, author: 'Kuro' },
  { name: 'Alive', isComplete: false, author: 'Kuro' }
]

const music = [
  { name: 'Code', isComplete: false, author: 'Kuro' },
  { name: 'Sleep', isComplete: false, author: 'Đạt' },
  { name: 'Eat', isComplete: false, author: 'Kuro' },
  { name: 'Alive', isComplete: false, author: 'Kuro' }
]
const imageDirectory = path.join(__dirname, '../../resources/images')

class TasksService {
  static async getList(req: Http.RequestCutome, res: Response, next: NextFunction) {
    return { lists }
  }

  static async getChapter(req: Http.RequestCutome, res: Response, next: NextFunction) {
    return { chapter }
  }

  static async getMusic(req: Http.RequestCutome, res: Response, next: NextFunction) {
    return { music }
  }

  static async getImages(req: Http.RequestCutome, res: Response, next: NextFunction) {
    const fileNames = await fs.promises.readdir(imageDirectory) // Đọc thư mục
    const files = fileNames.map((fileName) => ({
      name: fileName,
      path: path.join(imageDirectory, fileName)
    }))

    console.log({ fileNames, files })

    const images = []

    files.forEach((file) => {
      const filePath = path.join(imageDirectory, file.name)
      const data = fs.readFileSync(filePath) // Đọc file dưới dạng byte
      console.log({ data })
      
      images.push({
        name: file?.name,
        data: data // Dữ liệu ảnh dưới dạng byte
      })
    })
    console.log({ images })
    return { images }
  }
}

export default TasksService
