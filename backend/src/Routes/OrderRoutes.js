import express from "express";
import { checkout } from "../Controllers/OrderController.js";
import UserMiddleware from "../Middleware/UserMiddleware.js";

const router = express.Router();

// Protected checkout route
router.post("/checkout", UserMiddleware, checkout);

export default router;
