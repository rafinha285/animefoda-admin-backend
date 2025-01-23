import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";
import {eventLoggerAdmin} from "../../../events/logAdminChange";
import {UserToken} from "../../../types/Global";

export default async function deleteCharacter(req: e.Request, res: e.Response) {
    try{
        const {charId} = req.params
        if(!charId){
            return sendError(res,ErrorType.badRequest)
        }
        const query = "DELETE FROM anime.characters WHERE id = $1"
        eventLoggerAdmin.emit("character-change",query,(req.user as UserToken))
        await req.db.query(query,[charId])
        res.json({success:true})
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}