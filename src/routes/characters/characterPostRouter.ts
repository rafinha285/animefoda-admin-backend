import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import newCharacter from "./post/newCharacter";

const characterPostRouter = Router()

characterPostRouter.post("/new",newCharacter)

export default characterPostRouter