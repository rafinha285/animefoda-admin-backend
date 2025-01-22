import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";

export default async function getCharactersFromAnime(req:e.Request,res:e.Response):Promise<void> {
    try{
        const {animeId} = req.params;
        if(!animeId){
            return sendError(res,ErrorType.undefined)
        }
        
        const result = await req.db.query("SELECT * FROM anime.characters WHERE anime_id=$1", [animeId]);

        res.json({
            success:true,
            data: result.rows,
        });
    }catch(err){
        console.log(err);
        return sendError(res,ErrorType.default, 500, err);
    }
}