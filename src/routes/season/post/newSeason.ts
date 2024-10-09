import e, {query} from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import {eventLoggerAdmin} from "../../../events/logAdminChange";
import {JwtUser, UserToken} from "../../../types/Global";

export default async function newSeason(req:e.Request, res: e.Response) {
    try{
        let {name,index} = req.body;
        let {aniId} = req.params;
        await req.db.query("BEGIN")
        let query = "INSERT INTO anime.seasons(anime_id, name, episodes, index) VALUES ($1, $2, $3, $4) RETURNING id"
        eventLoggerAdmin.emit("anime-change",query,req.user as UserToken)

        let result  = await req.db.query(query,
            [aniId,name,[],parseInt(index)]
        )

        await req.db.query("COMMIT")
        res.json({success:true,message:`season adicionada: ${aniId}/${result.rows[0].id}`})
    }catch(err:any){
        sendError(res,ErrorType.default,500,err)
    }
}
