import { Router } from "express";
import { UtilsControllers } from "~/controllers";
import asyncHandler from "~/helpers/asyncHandler";

const routerUtils = Router()
routerUtils.get('/stream', asyncHandler(UtilsControllers.stream))


export default routerUtils