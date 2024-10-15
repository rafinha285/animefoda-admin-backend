import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import {eventLoggerAdmin} from "../../../events/logAdminChange";
import {UserToken} from "../../../types/Global";

export default async function updateAnime(req:e.Request, res: e.Response) {
    try{
        const {id} = req.params;
        const {name,name2,description,quality,language,state,releasedate,genre,weekday,visible} = req.body
        // const weekdayValue = weekday ? weekday : null;

        await req.db.query("BEGIN")

        let query = `
            UPDATE anime.anime SET
                name = $1,
                name2 = $2,
                description = $3,
                quality = $4,
                language = $5,
                state = $6,
                releasedate = $7,
                genre = $8,
                weekday = CAST($9 AS anime.weekday),
                visible = $10
                
            WHERE id = $11
            RETURNING *;
        `

        eventLoggerAdmin.emit("anime-change",query,req.user as UserToken);
        let result = await req.db.query(query,[name,name2,description,quality,language,state,releasedate,genre,weekday,visible,id]);

        await req.db.query("COMMIT")
        res.json({success:true,result:result.rows[0]})
    }catch(err){
        await req.db.query("ROLLBACK")
        sendError(res,ErrorType.default,500,err)
    }
}
