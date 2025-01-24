import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";

export default async function getCharacter(req:e.Request, res:e.Response){
    try{
        const {charId} = req.params;
        if(!charId){
            return sendError(res,ErrorType.undefined)
        }
        const character = await req.db.query("SELECT * FROM anime.characters WHERE id=$1", [charId]);
        res.json({
            success:true,
            data:character.rows[0]
        })
    }catch(err){
        return sendError(res,ErrorType.default,500,err)
    }
}