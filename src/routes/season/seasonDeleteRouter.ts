import { Router } from "express";
import { checkToken } from "../../token/checkToken";
import checkIsSuper from "../../token/checkIsSuper";
import deleteSeason from "./delete/deleteSeason";

const seasonDeleteRouter = Router()

seasonDeleteRouter.delete("/:aniId/:id",checkToken,checkIsSuper,deleteSeason)

export default seasonDeleteRouter
