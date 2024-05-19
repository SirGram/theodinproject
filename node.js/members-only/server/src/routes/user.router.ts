import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { me } from "../controllers/user.controller";
const router = Router()

// /api/users

router.get("/me", authMiddleware, me)

export default router
