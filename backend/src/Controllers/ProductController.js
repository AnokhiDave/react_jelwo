import {
  getAllProductsModel,
  getProductById,
  addProductModel,
  getCategoriesModel,
  getProductsByCategoryModel,
  filterProductsModel 
} from "../Models/ProductModel.js";

/* GET ALL */
export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsModel();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* GET BY ID */
export const ProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* POST */
export const addProduct = async (req, res) => {
  try {
    const result = await addProductModel(req.body);

    res.status(201).json({
      message: "Product added successfully",
      prod_id: result.insertId
    });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({
      message: "Database error",
      error: err
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await getCategoriesModel();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await getProductsByCategoryModel(category);

    res.json(products);

  } catch (error) {
    console.error("CATEGORY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const filterProducts = async (req, res) => {
  try {
    const filters = req.query;

    const products = await filterProductsModel(filters);

    res.json(products);

  } catch (error) {
    console.error("FILTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};