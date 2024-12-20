import * as e from "express";
import * as jwt from 'jsonwebtoken'
import config from "../config/config.json";
import { ErrorType, sendError } from "../functions/general/Error";
import {JwtUser, UserToken} from "../types/Global";
import deleteToken from "./deleteToken";
import Console from "../functions/general/Console";
export async function checkToken(req:e.Request,res:e.Response,next:e.NextFunction){
    try{
        const { timezone, webglrenderer, webglvendor } = req.headers;
        const userAgent = req.headers['user-agent']
        const tokenHeader = req.headers.authorization?.split(" ")[1];
        const tokencookie = req.cookies.token
        const token = tokenHeader || tokencookie;
        // console.log(req.headers)
        // console.log(userAgent)
        // console.log(timezone, webglrenderer, webglvendor)
        if(!(timezone||webglrenderer||webglvendor||userAgent)){
            return sendError(res,ErrorType.noToken)
        }
        if(!token){
            return sendError(res,ErrorType.noToken)
        }
        let jwtResult;
        try {
            jwtResult = jwt.verify(token, config.SECRET_KEY);
        } catch (err) {
            // Captura erros do JWT, como tokens inválidos ou expirados
            return sendError(res,ErrorType.invalidToken);
        }
        const user = jwtResult as UserToken;
        Console.log(jwtResult)
        let result = await req.db.query(`
            SELECT expires_at
            FROM users.users_sessions
            WHERE user_id = $1
              AND user_agent = $2
              AND time_zone = $3
              AND web_gl_vendor = $4
              AND web_gl_renderer = $5
              AND enabled = true
              AND session_id = $6
        `,[user._id,userAgent,timezone,webglvendor,webglrenderer,user.session_id])
        // Console.log(result)
        // Console.log(result.rows.length === 0)
        if(result.rows.length === 0){
            return sendError(res,ErrorType.unauthorized);
        }
        // console.log(new Date(result.rows[0].expires_at).getTime() > new Date().getTime())
        // if(new Date(result.rows[0].expires_at).getTime() < new Date().getTime()){
        //     await deleteToken(req)
        //     return sendError(res,ErrorType.unauthorized);
        // }
        req.user = user;
        next()
    }catch(err){
        next(err)
        throw err
    }
}
