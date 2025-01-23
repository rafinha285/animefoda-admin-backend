import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import Console from "../../../functions/general/Console";

export default async function updateCharacter(req:e.Request, res:e.Response){
    try{
        const {charId} = req.params;
        const {name,role} = req.body;
        if(!(name || role || charId)){
            return sendError(res,ErrorType.badRequest)
        }
        Console.log(req.body)
        const result = await req.db.query("UPDATE anime.characters SET name = $1, role = $2 WHERE id = $3 RETURNING *",[name,role,charId]);
        Console.log(result.rows)
        if(result.rows.length == 0){
            return sendError(res,ErrorType.default, 500, result.rows[0]);
        }
        res.json({success:true})
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}