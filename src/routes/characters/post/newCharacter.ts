import {ErrorType, sendError} from "../../../functions/general/Error";
import {Character} from "../../../types/Character";
import e from "express";

export default async function newCharacter(req:e.Request, res: e.Response){
    try{
        console.log(req.body);
        const {name, role, anime_id} = req.body;
        await req.db.query(`
        INSERT INTO anime.characters(
             name,
             role,
             anime_id
        )  VALUES (
            $1,
            $2,
            $3
        )`,[
            name,
            role,
            anime_id
        ])
        res.json({
            success:true,
        })
    }catch(err){
        return sendError(res,ErrorType.default,500,err)
    }
}