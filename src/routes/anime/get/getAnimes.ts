import e from "express";

export default async function getAnimes(req:e.Request,res:e.Response) {
    try{
        let animes = (await req.db.query(`SELECT id, averageeptime, date_added, description, genre, language, name, name2, quality, rating, weekday, state, releasedate 
            FROM anime.anime
        `)).rows;
        res.json({success: true, animes: animes});
    }catch(err){
        res.status(500).send({error:err});
    }
}
