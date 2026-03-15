import express from "express";
import { register, login, logout } from "../controllers/authController";
import { validateRequest } from "../middlewares/validateRequest";
import { loginSchema, registerSchema } from "../validators/authValidators";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", logout);

export default router;