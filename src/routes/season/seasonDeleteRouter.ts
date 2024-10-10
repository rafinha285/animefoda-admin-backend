import { Router } from "express";
import { checkToken } from "../../token/checkToken";
import checkIsSuper from "../../token/checkIsSuper";

const seasonDeleteRouter = Router()

seasonDeleteRouter.delete("/:aniId/:id",checkToken,checkIsSuper,)

export default seasonDeleteRouter