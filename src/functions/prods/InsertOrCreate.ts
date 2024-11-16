import e from "express";
import {eventLoggerAdmin} from "../../events/logAdminChange";
import {UserToken} from "../../types/Global";

export async function findOrCreateProd(name: string,typee:"producers"|"creators"|"studios",req:e.Request):Promise<string> {
    try {
        var prod = await req.db.query(`SELECT * FROM anime.${typee} WHERE name = $1 LIMIT 1`,[name])
        console.log(prod)
        if(prod.rows.length == 0){
            console.log("insert prod")
            const query = `INSERT INTO anime.${typee} (id,name) VALUES (gen_random_uuid (), $1) RETURNING id`
            eventLoggerAdmin.emit("anime-change",query,req.user as UserToken)
            await req.db.query(query,
                [name]).then((v)=>{
                prod = v
            })
            // console.log("inserto prod")
            // console.log(prod)
        }
        return prod.rows[0].id
    } catch (error) {
        console.error(`Erro ao encontrar ou criar o ${typee}:`, error);
        throw error;
    }
}
// export async function findOrCreateStudio(name: string,req:e.Request): Promise<string> {
//
//     try {
//         var studio = await req.db.query(`SELECT * FROM anime.studios WHERE name = $1 LIMIT 1`,[name])
//         if(studio.rows.length == 0){
//             await req.db.query(`
//                 INSERT INTO anime.studios (id,name)
//                 VALUES (gen_random_uuid (), $1)
//                 RETURNING id
//             `,[name]).then((v)=>{
//                 studio = v
//             })
//         }
//         // console.log(studio)
//         return studio.rows[0].id.toString()
//     } catch (error) {
//         console.error('Erro ao encontrar ou criar o estúdio:', error);
//         throw error;
//     }
// }
// export async function findOrCreateCreator(name: string,req:e.Request) : Promise<string>{
//     try {
//         let creator = await req.db.query(`SELECT * FROM anime.creators WHERE name = $1 LIMIT 1`,[name])
//         if(creator.rows.length == 0){
//             await req.db.query(`
//                 INSERT INTO anime.creators (id,name)
//                 VALUES (gen_random_uuid (), $1)
//                 RETURNING id
//             `,[name]).then(v=>{
//                 creator = v
//             })
//         }
//         // console.log(creator)
//         return creator.rows[0].id.toString()
//     } catch (error) {
//         console.error('Erro ao encontrar ou criar o criador:', error);
//         throw error;
//     }
// }
