import { Router } from "express";

const routerUser = Router()

routerUser.get('/get-all-list')
routerUser.get('/get-list-for-me')
routerUser.get('/get-me')
export {routerUser}



