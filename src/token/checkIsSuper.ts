import e from "express";
import {UserToken} from "../types/Global";
import {ErrorType, sendError} from "../functions/general/Error";
import Console from "../functions/general/Console";

export default async function checkIsSuper(req:e.Request,res:e.Response,next:e.NextFunction){
    try{
        Console.log(req.user)
        let dbResult = await req.db.query("SELECT superuser FROM users.users WHERE _id = $1",[(req.user as UserToken)._id]);
        if(!dbResult.rows[0].superuser){
            return sendError(res,ErrorType.unauthorizedNoRemove)
        }
        if(!dbResult.rows[0].superuser && (req.user as UserToken).super){
            return sendError(res,ErrorType.unauthorized)
        }
        if(!(req.user as UserToken).super){
            return sendError(res,ErrorType.notSuper)
        }
        next()
    }catch(err){
        next(err)
        throw err
    }
}
