import express from "express";
import {
  getAllBlog,
  getSingleBlog,
  createBlog,
  getRecentBlog   // 👈 add this
} from "../Controllers/BlogController.js";

const router = express.Router();

router.get("/recent", getRecentBlog);  // 👈 MUST BE ABOVE /:id
router.get("/", getAllBlog);
router.get("/:id", getSingleBlog);
router.post("/", createBlog);

export default router;