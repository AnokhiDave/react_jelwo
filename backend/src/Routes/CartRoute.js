import express from "express";
import {
  getCart,
  addCart,
  updateQty,
  removeCart,
  clearCart
} from "../Controllers/CartController.js";
import UserMiddleware from "../Middleware/UserMiddleware.js";

const router = express.Router();

router.use(UserMiddleware);

router.get("/", getCart);
router.post("/", addCart);
router.put("/:productId", updateQty);
router.delete("/:productId", removeCart);
router.delete("/", clearCart);

export default router;
