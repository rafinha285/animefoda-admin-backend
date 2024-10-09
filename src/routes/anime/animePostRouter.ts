import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import addProds from "./post/addProds";

const animePostRouter = Router();

animePostRouter.post("/add/prods/:id/:prod/:prodName",checkToken,addProds)

export default animePostRouter;
