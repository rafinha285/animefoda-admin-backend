import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import path from "path";
import {ANIME_PATH} from "../../../config/pathConfig";
import fs from "fs";

export default function (req:e.Request, res:e.Response){
    try{
        const {aniId,id} = req.params;
        if(!req.file){
            return sendError(res,ErrorType.undefined)
        }
        if(!(aniId||id)){
            return sendError(res, ErrorType.badRequest)
        }
        const pathImg = path.join(ANIME_PATH,aniId,"characters",id,`${id}.jpg}`)
        fs.writeFileSync(pathImg,req.file.buffer);
        res.json({success:true,message:`Image saved from character: ${id}`});
    }catch(err){
        sendError(res,ErrorType.default)
    }
}