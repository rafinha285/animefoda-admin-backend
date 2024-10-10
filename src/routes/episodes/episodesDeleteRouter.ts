import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import deleteEpisode from "./delete/deleteEpisode";
import checkIsSuper from "../../token/checkIsSuper";

const episodesDeleteRouter = Router();

episodesDeleteRouter.delete("/:aniId/:seasonId/:id",checkToken,checkIsSuper,deleteEpisode)

export default episodesDeleteRouter;
