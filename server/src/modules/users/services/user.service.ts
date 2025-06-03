import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "~/core/http";
import userModel from "~/models/User";
import { Http } from "~/type";

class UserService {
  constructor() { }
  async getAllListUsers(request: Http.RequestCutome, response: Response, next: NextFunction) {
    const users = await userModel.find()
    return { users }


  }
  async getMe(request: Http.RequestCutome, response: Response, next: NextFunction) {
    const { user: userRequest } = request
    const user = await userModel.findOne({ _id: userRequest?._id })
    if (!user) {
      throw new BadRequestError({ metadata: 'Không tìm thấy thông tin' })
    }
    return { user }


  }
}


export default UserService