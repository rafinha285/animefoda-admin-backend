import e from "express";
import { UserToken } from "../types/Global";
import { ErrorType, sendError } from "../functions/general/Error";

export default async function checkIsSuper(req:e.Request,res:e.Response,next:e.NextFunction){
    try{
        if(!(req.user as UserToken).super){
            return sendError(res,ErrorType.notSuper)
        }
        next()
    }catch(err){
        next(err)
        throw err
    }
}