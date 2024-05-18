import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { signIn } from "../controllers/auth.controller";
const router = Router()

// /api/auth
router.post("/register", registerUser)
router.post("/signin", signIn)


export default router
