import { Router } from "express";
import { checkToken } from "../../token/checkToken";
import checkIsSuper from "../../token/checkIsSuper";
import deleteAnime from "./delete/deleteAnime";

const animeDeleteRouter = Router()

animeDeleteRouter.delete("/:id",checkToken,checkIsSuper,deleteAnime)

export default animeDeleteRouter
