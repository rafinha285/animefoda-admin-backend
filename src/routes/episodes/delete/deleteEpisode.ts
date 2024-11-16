import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import {eventLoggerAdmin} from "../../../events/logAdminChange";
import {UserToken} from "../../../types/Global";
import path from "path";
import {ANIME_PATH} from "../../../config/pathConfig";
import * as fs from "node:fs";
import {deleteFolderRecursive} from "../../../functions/general/Path";

export default async function deleteEpisode(req:e.Request, res: e.Response){
    try {
        let {aniId,id,seasonId} = req.params;
        if(!id||!aniId||!seasonId){
            return sendError(res,ErrorType.undefined)
        }
        let query = "DELETE FROM anime.episodes WHERE id = $1 AND season_id = $2 AND anime_id = $3"
        eventLoggerAdmin.emit("anime-change",query,req.user as UserToken);
        await req.db.query("BEGIN");

        await req.db.query("UPDATE anime.seasons SET episodes = array_remove(episodes,$1) WHERE anime_id = $2 AND id = $3",[id,aniId,seasonId])

        await req.db.query(query,[
            id,
            seasonId,
            aniId
        ])
        const epPath =path.join(ANIME_PATH,aniId,"seasons",seasonId,id)
        if(fs.existsSync(epPath)){
            deleteFolderRecursive(epPath);
        }

        await req.db.query("COMMIT")
        res.json({success:true,message:`Episódio deletado: ${id}`})
    }catch(err){
        await req.db.query("ROLLBACK")
        sendError(res,ErrorType.default,500,err)
    }
}
