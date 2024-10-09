import {Router} from "express";
import getAnime from "./get/getAnime";
import getAnimes from "./get/getAnimes";
import getSeasons from "./get/seasons";

const animeGetRouter = Router();

animeGetRouter.get("/all",getAnimes);
animeGetRouter.get("/seasons/:id",getSeasons);
animeGetRouter.get("/:id",getAnime);

export default animeGetRouter;
