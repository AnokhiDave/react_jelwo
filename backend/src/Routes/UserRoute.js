import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../Controllers/UserController.js";
import UserMiddleware from "../Middleware/UserMiddleware.js"; // 🔑 import

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", UserMiddleware, getUserProfile); // ✅ protect route

export default router;
