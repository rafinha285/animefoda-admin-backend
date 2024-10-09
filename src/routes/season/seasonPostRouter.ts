import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import newSeason from "./post/newSeason";

const seasonPostRouter = Router();

seasonPostRouter.post("/:aniId/",checkToken,newSeason)

export default seasonPostRouter;
