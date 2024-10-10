import { Router } from "express";
import { checkToken } from "../../token/checkToken";
import checkIsSuper from "../../token/checkIsSuper";

const animeDeleteRouter = Router()

animeDeleteRouter.delete("/:id",checkToken,checkIsSuper)

export default animeDeleteRouter