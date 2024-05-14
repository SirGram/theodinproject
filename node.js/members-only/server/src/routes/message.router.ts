import { Router } from "express";
import { createMessage, getMessages } from "../controllers/message.controller";
const router = Router()

// /api/messages
router.get("/", getMessages)
router.post("/", createMessage)


export default router