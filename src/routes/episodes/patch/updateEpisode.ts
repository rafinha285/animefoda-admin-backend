import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";

export default async function updateEpisode(req:e.Request, res: e.Response){
    try{
        const {name,ending,epindex,openingend,openingstart,releasedate} = req.body;
        await req.db.query("BEGIN")
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
