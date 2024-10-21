import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import {eventLoggerAdmin} from "../../../events/logAdminChange";
import {UserToken} from "../../../types/Global";

export default async function newSeason(req:e.Request, res: e.Response) {
    try{
        let {name,index} = req.body;
        if(!name&&!index){
            return sendError(res,ErrorType.undefined)
        }
        let {aniId} = req.params;
        await req.db.query("BEGIN")
        let query = `INSERT INTO anime.seasons(anime_id, name, episodes, index) VALUES ($1, $2, $3, $4) RETURNING *`
        eventLoggerAdmin.emit("anime-change",query,req.user as UserToken)

        let result  = await req.db.query(query,
            [aniId,name,[],parseInt(index)]
        )
        console.log(result)

        await req.db.query("COMMIT")
        res.json({success:true,season:result.rows[0]})
        // res.json({success:true,message:`test`})
    }catch(err:any){
        await req.db.query("ROLLBACK")
        sendError(res,ErrorType.default,500,err)
    }
}
