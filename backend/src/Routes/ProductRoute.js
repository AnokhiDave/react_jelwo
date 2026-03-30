import express from "express";
import {
  getAllProducts,
  ProductDetails,
  addProduct,
  getCategories,
  getProductsByCategory,
  filterProducts   
} from "../Controllers/ProductController.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/category/:category", getProductsByCategory);
router.get("/filter", filterProducts); 
router.get("/", getAllProducts);
router.get("/:id", ProductDetails);
router.post("/", addProduct);

export default router;