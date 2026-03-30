import express from "express";
import {
  getWishlist,
  addWishlist,
  removeWishlist
} from "../Controllers/WishlistController.js";
import UserMiddleware from "../Middleware/UserMiddleware.js";

const router = express.Router();

router.use(UserMiddleware);

router.get("/", getWishlist);
router.post("/", addWishlist);
router.delete("/:productId", removeWishlist);

export default router;
