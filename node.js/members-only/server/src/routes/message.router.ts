import { Router } from "express";
import { createMessage, deleteMessage, getMessages } from "../controllers/message.controller";
import authMiddleware from "../middleware/authMiddleware";
const router = Router()

// /api/messages
router.get("/", getMessages)
router.post("/", authMiddleware, createMessage)
router.delete("/:id", authMiddleware, deleteMessage)


export default router