import * as e from "express";
import * as jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../config/config.json";
import {JwtUser, UserToken} from "../types/Global";
import {QueryResult} from "pg";
import Console from "../functions/general/Console";
export default async function insertToken(req:e.Request,userR:{
    _id:string,
    username:string,
    user_agent:string,
    time_zone:string,
    web_gl_vendor:string,
    web_gl_renderer:string,
}):Promise<string>{
    try{
        const expires_at = new Date()
        expires_at.setDate(expires_at.getDate()+7)

        let result = await req.db.query(`INSERT INTO users.users_sessions (
                    user_id, expires_at, user_agent, time_zone, web_gl_vendor, web_gl_renderer, ip_address
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *`
            ,[
                userR._id,
                expires_at,
                userR.user_agent,
                userR.time_zone,
                userR.web_gl_vendor,
                userR.web_gl_renderer,
                req.socket.remoteAddress,
            ]);
        let userResult = await req.db.query("SELECT superuser FROM users.users WHERE _id = $1",[userR._id])
        // Console.log(userResult)
        if(result.rows.length !== 0){
            let row = result.rows[0];
            console.log(row)
            let user:UserToken = {
                _id:row.user_id,
                super:userResult.rows[0].superuser,
                username:row.username,
                expires_at:row.expires_at,
                session_id:row.session_id,
            }
            let jwtToken = jwt.sign(user,SECRET_KEY,{'expiresIn':"7 days"})
            console.log(jwtToken)
            return jwtToken
        }else{
            throw new Error("Erro ao iniciar sessão")
        }
    }catch(err){
        throw err
    }
}
