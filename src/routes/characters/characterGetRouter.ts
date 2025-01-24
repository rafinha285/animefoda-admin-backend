import {Router} from "express";
import getCharactersFromAnime from "./get/charactersFromAnime";
import getCharacter from "./get/getCharacter";

const characterGetRouter = Router()

characterGetRouter.get('/anime/:animeId',getCharactersFromAnime)
characterGetRouter.get('/:charId',getCharacter)

export default characterGetRouter