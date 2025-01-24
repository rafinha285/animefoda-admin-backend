import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import path from "path";
import {ANIME_PATH} from "../../../config/pathConfig";
import fs from "fs";

export default async function (req:e.Request, res:e.Response){
    try{
        const {aniId,id} = req.params;
        if(!req.file){
            return sendError(res,ErrorType.undefined)
        }
        if(!(aniId||id)){
            return sendError(res, ErrorType.badRequest)
        }
        const pathImg = path.join(ANIME_PATH,aniId,"characters",id)
        const imgFile = path.join(pathImg,`${id}.jpg`)
        fs.mkdirSync(pathImg,{recursive:true});
        fs.writeFileSync(imgFile,req.file.buffer);
        res.json({success:true,message:`Image saved from character: ${id}`});
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}