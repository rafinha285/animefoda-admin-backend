import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import newCharacter from "./post/newCharacter";
import updateCharacter from "./post/updateCharacter";
import checkIsSuper from "../../token/checkIsSuper";
import deleteCharacter from "./post/deleteCharacter";
import multer from "multer";
import uploadImg from "./post/uploadImg";

const characterPostRouter = Router()

const storageCharacter = multer.memoryStorage()
const uploadCharacter = multer({ storage: storageCharacter });

characterPostRouter.post("/new",checkToken,newCharacter)
characterPostRouter.post("/img/:id/:charId",checkToken,uploadCharacter.single("file"),uploadImg)
characterPostRouter.delete("/delete/:charId",checkToken,checkIsSuper,deleteCharacter)
characterPostRouter.post("/update/:charId",checkToken,updateCharacter)

export default characterPostRouter