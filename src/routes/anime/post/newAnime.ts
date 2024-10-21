import e, {query} from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import {findOrCreateProd} from "../../../functions/prods/InsertOrCreate";
import {Anime} from "../../../types/Anime";
import {v4 as uuidv4} from "uuid"
import path from "path";
import fs from "fs";
import {ANIME_PATH} from "../../../config/pathConfig";
import {eventLoggerAdmin} from "../../../events/logAdminChange";
import {UserToken} from "../../../types/Global";

export default async function newAnime(req:e.Request, res: e.Response) {
    try{
        const {name,name2,description,releasedate,producers,studios,creators,gens,language,quality,state} = req.body

        let prod:string[] = []
        let crea:string[] = []
        let stud:string[] = []
        for(const producerName of producers){
            prod.push(await findOrCreateProd(producerName,"producers",req))
        }
        for(const producerName of producers){
            crea.push(await findOrCreateProd(producerName,"creators",req))
        }
        for(const producerName of producers){
            stud.push(await findOrCreateProd(producerName,"studios",req))
        }
        await req.db.query("BEGIN")
        const query = `
            INSERT INTO anime.anime (
                averageeptime,
                description,
                genre,
                language,
                name,
                name2,
                quality,
                rating,
                producers,
                creators,
                studios,
                state,
                releasedate
            ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10,
                $11,
                $12,
                $13
            ) RETURNING *
        `
        // eventLoggerAdmin.emit("anime-change",query,req.user as UserToken)
        let ani = await req.db.query(query,[
            0,
            description,
            gens,
            language,
            name,
            name2,
            quality,
            0,
            prod,
            crea,
            stud,
            state,
            releasedate,
        ])

        var p = path.join(ANIME_PATH,ani.rows[0].id)
        fs.mkdirSync(p)
        fs.mkdirSync(path.join(p,"img"))
        fs.mkdirSync(path.join(p,"characters"))
        fs.mkdirSync(path.join(p,'seasons'))

        await req.db.query("COMMIT")
        res.json({success:true,message:ani.rows[0]})
    }catch(err){
        await req.db.query("ROLLBACK")
        sendError(res,ErrorType.default,500,err)
    }
}
