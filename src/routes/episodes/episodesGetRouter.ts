import e from "express";
import getEpisode from "./get/getEpisode";

const episodesGetRouter = e.Router();

episodesGetRouter.get("/:animeId/:seasonId/:epId", getEpisode);

export default episodesGetRouter;
