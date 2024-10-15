import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import Console from "../../../functions/general/Console";

export default async function addProds(req:e.Request,res:e.Response) {
    try{
        const {id,prod,prodName} = req.params;
        Console.log(id,prod,prodName);
        await req.db.query("BEGIN")
        let prodResult = (await req.db.query(`SELECT * FROM anime.${prod} WHERE name = $1`,[prodName])).rows;
        if(!(prodResult.length>0)){
            prodResult = (await req.db.query(`INSERT INTO anime.${prod}(id,name) VALUES (gen_random_uuid(), $1)RETURNING *;`,[prodName])).rows
        }
        let aniprod = (await req.db.query(`SELECT array_to_json(${prod}) FROM anime.anime WHERE id = $1`,[id])).rows[0].array_to_json||[];
        console.log(prodResult);
        aniprod.push(prodResult[0].id)
        console.log(aniprod);
        await req.db.query(`UPDATE anime.anime SET ${prod} = array_append(producers,$1) WHERE id = $2`,[prodResult[0].id,id])
        await req.db.query("COMMIT")
        res.json({success:true,result:prodResult})
    }catch(err){
        await req.db.query("ROLLBACK")
        sendError(res,ErrorType.default,500,err)
    }
}
