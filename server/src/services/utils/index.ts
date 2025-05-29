import { NextFunction, Response } from 'express'
import { Http } from '~/type'
import path from 'path'
import fs from 'fs'
class UtilsService {
  static async stream(req: Http.RequestCutome, res: Response, next: NextFunction) {
    const pathDir = '../../resources/images'
    const result = path.join(__dirname, pathDir)

    const dir = await fs.promises.readdir(result)
    const data = []
    for (const item of dir) {
      const pathItem = path.join(result, item,)
      const files = await new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(pathItem)
        const chunks = [];

        readStream.on('data', (chunk) => {
          console.log({ chunk, item, pathItem })
          chunks.push(chunk);
        });

        readStream.on('end', () => {
          resolve(Buffer.concat(chunks)); // Trả về nội dung file
        });

        readStream.on('error', (err) => {
          reject(err);
        });
      })
      data.push({files, pathItem})
    }
    data.forEach((item) => console.log({item, lenth: data.length}))
    return { dir, data }
  }
}
export default UtilsService
