import { Router } from "express";
import songController from "../controllers/song.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/", upload.single("song"), songController.uploadSong);
router.get("/", songController.getSong);

export default router;