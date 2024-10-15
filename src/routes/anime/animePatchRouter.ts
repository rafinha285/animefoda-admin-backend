import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import updateAnime from "./patch/updateAnime";

const animePatchRouter = Router();

animePatchRouter.patch("/update/:id",checkToken,updateAnime)

export default animePatchRouter;
