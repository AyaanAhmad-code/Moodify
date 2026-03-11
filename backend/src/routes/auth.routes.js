import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { registerValidator } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", registerValidator, authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/get-me", authUser, authController.getMeUser);
router.get("/logout", authController.logoutUser);

export default router;