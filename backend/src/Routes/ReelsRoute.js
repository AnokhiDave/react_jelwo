import express from "express";
import {
  getReels,
  createReel,
  removeReel
} from "../Controllers/ReelsController.js";

const router = express.Router();

router.get("/", getReels);
router.post("/", createReel);
router.delete("/:id", removeReel);

export default router;