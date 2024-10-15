import {Router} from "express";
import getAnime from "./get/getAnime";
import getAnimes from "./get/getAnimes";

const animeGetRouter = Router();

animeGetRouter.get("/all",getAnimes);
animeGetRouter.get("/:id",getAnime);

export default animeGetRouter;
