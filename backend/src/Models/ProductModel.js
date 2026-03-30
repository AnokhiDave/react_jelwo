import db from "../Config/db.js";

/* GET all products */
export const getAllProductsModel = async () => {
  const [rows] = await db.query("SELECT * FROM products");
  return rows;
};

/* GET SINGLE PRODUCT */
export const getProductById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM products WHERE prod_id = ?",
    [id]
  );
  return rows[0];
};

/* POST product */
export const addProductModel = async (data) => {
  const sql = `
    INSERT INTO products 
    (prod_title, prod_category, prod_price, prod_oldprice, prod_discount, prod_image, prod_stock, prod_thumb, prod_sku, prod_shortdesc, prod_longdesc, prod_size, prod_color, prod_review)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.prod_title,
    data.prod_category,
    data.prod_price,
    data.prod_oldprice,
    data.prod_discount,
    data.prod_image,
    data.prod_stock,
    data.prod_thumb,
    data.prod_sku,          // ✅ fixed
    data.prod_shortdesc,
    data.prod_longdesc,
    data.prod_size,
    data.prod_color,
    data.prod_review
  ];

  const [result] = await db.query(sql, values);
  return result;
};

/* GET DISTINCT CATEGORIES */
export const getCategoriesModel = async () => {
  const [rows] = await db.query(
    "SELECT DISTINCT prod_category FROM products"
  );

  return rows.map(row => row.prod_category);
};

export const getProductsByCategoryModel = async (category) => {

  // Convert to uppercase
  let formattedCategory = category.toUpperCase();

  // Remove trailing 'S' (RINGS -> RING, EARRINGS -> EARRING)
  if (formattedCategory.endsWith("S")) {
    formattedCategory = formattedCategory.slice(0, -1);
  }

  const [rows] = await db.query(
    "SELECT * FROM products WHERE prod_category = ?",
    [formattedCategory]
  );

  return rows;
};

/* FILTER PRODUCTS */
export const filterProductsModel = async (filters) => {
  let query = "SELECT * FROM products WHERE 1=1";
  let values = [];

  if (filters.category) {
    query += " AND prod_category = ?";
    values.push(filters.category.toUpperCase());
  }

  if (filters.minPrice) {
    query += " AND prod_price >= ?";
    values.push(Number(filters.minPrice));
  }

  if (filters.maxPrice) {
    query += " AND prod_price <= ?";
    values.push(Number(filters.maxPrice));
  }

  if (filters.size) {
    query += " AND FIND_IN_SET(?, prod_size)";
    values.push(filters.size);
  }

  if (filters.color) {
    query += " AND FIND_IN_SET(?, prod_color)";
    values.push(filters.color);
  }

  // ✅ FIXED STOCK FILTER (PROPER VERSION)
  if (filters.stock === "in") {
    query += " AND prod_stock > 0";
  }

  if (filters.stock === "out") {
    query += " AND prod_stock = 0";
  }

  const [rows] = await db.query(query, values);
  return rows;
};