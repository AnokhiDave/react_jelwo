import express from "express";
import {
  getCommentsByBlog,
  addComment,
} from "../Controllers/CommentController.js";

const router = express.Router();

router.get("/:blogId", getCommentsByBlog);
router.post("/", addComment);

export default router;
