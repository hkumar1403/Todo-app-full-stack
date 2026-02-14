import express from "express";
import { register, login } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { getMe } from "../controllers/auth.controller";

const router = express.Router();

router.get("/me", protect, getMe);
router.post("/register", register);
router.post("/login", login);

export default router;
