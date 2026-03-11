const { Router} = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")
import { registerValidator } from "../validators/auth.validator.js";

const router = Router();

router.post("/register",registerValidator,authController.registerUser)
router.post("/login",authController.loginUser)
router.get("/get-me",authMiddleware.authUser,authController.getMeUser)
router.get("/logout",authController.logoutUser)

module.exports = router