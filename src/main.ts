import e from "express"
import bodyParser from "body-parser";
import cookie_parser from "cookie-parser"
import pgClient from "./database/postgres";
import {BUILD_HTML, BUILD_PATH} from "./config/pathConfig";
import Console from "./functions/general/Console";
import sendFile from "./functions/general/File";
import {checkToken} from "./token/checkToken";
import animeGetRouter from "./routes/anime/animeGetRouter";
import userGetRouter from "./routes/user/userGetRouter";
import animePostRouter from "./routes/anime/animePostRouter";
import episodesGetRouter from "./routes/episodes/episodesGetRouter";
import seasonPostRouter from "./routes/season/seasonPostRouter";

const app = e()

app.use(bodyParser.json())
app.use(cookie_parser())
app.use(async (req:e.Request,res:e.Response,next:e.NextFunction)=>{
    req.db = pgClient
    next()
})



//rotas de animes
app.use('/ani/g/',animeGetRouter)
app.use('/ani/p/',animePostRouter)
//rotas de seasons
app.use('/ani/season/p/',seasonPostRouter)
//rotas para episódios
app.use('/ep/g/',episodesGetRouter)
//rotas de usuarios
app.use('/user/g/',userGetRouter)



app.use(e.static(BUILD_PATH))

app.get('*',(req:e.Request,res:e.Response)=>{
    sendFile().cssJs(res)
    Console.log(BUILD_HTML)
    res.sendFile(BUILD_HTML)
})

app.listen(8081,()=>{
    console.log("Server is running on port 8081")
})