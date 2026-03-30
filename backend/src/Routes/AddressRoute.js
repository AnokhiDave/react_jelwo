import express from "express";
import {
  getAddresses,
  addAddress,
  deleteAddress,
  updateAddress
} from "../Controllers/AddressController.js";
import UserMiddleware from "../Middleware/UserMiddleware.js"; // 🔑 protect

const router = express.Router();

router.use(UserMiddleware); // protect all address routes

router.get("/", getAddresses);
router.post("/", addAddress);
router.delete("/:id", deleteAddress); // ensure matches controller
router.put("/:id", updateAddress);

export default router;
