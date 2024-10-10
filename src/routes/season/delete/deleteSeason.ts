import e from "express";
import { ErrorType, sendError } from "../../../functions/general/Error";
import {ANIME_PATH} from "../../../config/pathConfig";
import path from "path";
import fs from "fs"

export default async function deleteSeason(req:e.Request,res:e.Response){
    try{
        const {aniId,id} = req.params;
        let seasonPath = path.join(ANIME_PATH,aniId,"seasons",id)

        await req.db.query("BEGIN")

        await req.db.query("DELETE FROM anime.seasons WHERE anime_id = $1 AND id = $2",[aniId,id])
        fs.unlinkSync(seasonPath)

        await req.db.query("BEGIN")
        res.json({success:true,message:`Season deletada: ${aniId}/${id}`})
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}