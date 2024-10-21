import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import path from "path";
import {ANIME_PATH} from "../../../config/pathConfig";
import fs from "fs";

export async function uploadImg(req: e.Request, res: e.Response){
    try{
        const {id} = req.params;
        if(!req.file){
            return sendError(res,ErrorType.undefined)
        }
        if(!id){
            return sendError(res,ErrorType.NotId)
        }

        const pathImg = path.join(ANIME_PATH,id,"img",`${id}.jpg`)
        fs.writeFileSync(pathImg,req.file.buffer)
        res.json({success:true,message:`Image saved from anime: ${id}`})
    }catch(err){
        sendError(res,ErrorType.default,500,err);
    }
}
