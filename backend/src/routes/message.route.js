import { Router } from "express";
import { getUserfromSideBar,getMessages,sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const messageRouter = Router();

messageRouter.get("/users",protectRoute ,getUserfromSideBar)
messageRouter.get("/:id" , protectRoute , getMessages)
messageRouter.post("/send/:id" , protectRoute , sendMessage)

export default messageRouter;

