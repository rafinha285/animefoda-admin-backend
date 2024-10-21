import e from "express";
import { ErrorType, sendError } from "../../../functions/general/Error";
import {ANIME_PATH} from "../../../config/pathConfig";
import path from "path";
import fs from "fs"
import {eventLoggerAdmin} from "../../../events/logAdminChange";
import {UserToken} from "../../../types/Global";

export default async function deleteSeason(req:e.Request,res:e.Response){
    try{
        const {aniId,id} = req.params;
        let seasonPath = path.join(ANIME_PATH,aniId,"seasons",id)

        await req.db.query("BEGIN")

        const query = "DELETE FROM anime.seasons WHERE anime_id = $1 AND id = $2"

        eventLoggerAdmin.emit("anime-change",query,req.user as UserToken);

        await req.db.query(query,[aniId,id])
        if(fs.existsSync(seasonPath)){
            fs.unlinkSync(seasonPath)
        }

        await req.db.query("COMMIT")
        res.json({success:true,message:`Season deletada: ${aniId}/${id}`})
    }catch(err){
        await req.db.query("ROLLBACK")
        sendError(res,ErrorType.default,500,err)
    }
}
