import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import deleteEpisode from "./delete/deleteEpisode";

const episodesDeleteRouter = Router();

episodesDeleteRouter.delete("/:aniId/:seasonId/:id",checkToken,deleteEpisode)

export default episodesDeleteRouter;
