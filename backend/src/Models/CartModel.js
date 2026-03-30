import db from "../Config/db.js";

// Get cart
export const getCartByUser = async (userId) => {
  const [rows] = await db.query(
    `SELECT c.CartID, c.ProductID, c.Quantity, p.*
     FROM cart c
     JOIN products p ON p.prod_id = c.ProductID
     WHERE c.UserID = ? AND c.IsDeleted = 0`,
    [userId]
  );
  return rows;
};

// Add to cart (or increase quantity)
export const addToCart = async (userId, productId, qty = 1) => {
  const [rows] = await db.query(
    "SELECT * FROM cart WHERE UserID = ? AND ProductID = ?",
    [userId, productId]
  );

  if (rows.length > 0) {
    // Restore or increase qty
    if (rows[0].IsDeleted === 1) {
      await db.query(
        "UPDATE cart SET IsDeleted = 0, Quantity = ? WHERE CartID = ?",
        [qty, rows[0].CartID]
      );
    } else {
      await db.query(
        "UPDATE cart SET Quantity = Quantity + ? WHERE CartID = ?",
        [qty, rows[0].CartID]
      );
    }
    return { updated: true };
  }

  await db.query(
    "INSERT INTO cart (UserID, ProductID, Quantity) VALUES (?, ?, ?)",
    [userId, productId, qty]
  );

  return { added: true };
};

// Update quantity
export const updateCartQty = async (userId, productId, qty) => {
  if (qty <= 0) {
    return removeFromCart(userId, productId);
  }

  await db.query(
    "UPDATE cart SET Quantity = ? WHERE UserID = ? AND ProductID = ? AND IsDeleted = 0",
    [qty, userId, productId]
  );
};

// Soft delete
export const removeFromCart = async (userId, productId) => {
  await db.query(
    "UPDATE cart SET IsDeleted = 1 WHERE UserID = ? AND ProductID = ?",
    [userId, productId]
  );
};

// Clear cart
export const clearCart = async (userId) => {
  await db.query(
    "UPDATE cart SET IsDeleted = 1 WHERE UserID = ?",
    [userId]
  );
};
