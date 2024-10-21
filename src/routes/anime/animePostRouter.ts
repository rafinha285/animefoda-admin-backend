import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import addProds from "./post/addProds";
import newAnime from "./post/newAnime";
import multer from "multer";
import {uploadImg} from "./post/uploadImg";

const animePostRouter = Router();

const storageAnimeImg = multer.memoryStorage();
const uploadAnimeImg =multer({storage: storageAnimeImg});

animePostRouter.post("/add/prods/:id/:prod/:prodName",checkToken,addProds)
animePostRouter.post("/img/:id",checkToken,uploadAnimeImg.single("img"),uploadImg)
animePostRouter.post("/new",checkToken,newAnime)

export default animePostRouter;
