import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import path from "path";
import {ANIME_PATH} from "../../../config/pathConfig";
import {deleteFolderRecursive} from "../../../functions/general/Path";
import Console from "../../../functions/general/Console";

export default async function deleteAnime(req:e.Request, res: e.Response) {
    try{
        await req.db.query("BEGIN")
        const query = `
            DELETE FROM anime.anime WHERE id = ${req.params.id}
        `
        Console.warn(`Anime deletado ${req.params.id}`)
        await req.db.query(query)
        await req.db.query("COMMIT")
        deleteFolderRecursive(path.join(ANIME_PATH,req.params.id))
        res.send(`Anime deletado ${req.params.id}`)
    }catch(err){
        await req.db.query("ROLLBACK")
        sendError(res,ErrorType.default,500,err)
    }
}
