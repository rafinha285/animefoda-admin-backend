import {Router} from "express";
import logout from "./self/post/logout";
import login from "./self/post/login";

const userPostRouter = Router();

userPostRouter.post("/login",login);
userPostRouter.post('/logout',logout);

export default userPostRouter;
