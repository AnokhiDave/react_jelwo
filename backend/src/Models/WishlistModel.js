import db from "../Config/db.js";

// Get wishlist items
export const getWishlistByUser = async (userId) => {
  const [rows] = await db.query(
    `SELECT w.WishlistID, w.ProductID, p.*
     FROM wishlist w
     JOIN products p ON p.prod_id = w.ProductID
     WHERE w.UserID = ? AND w.IsDeleted = 0`,
    [userId]
  );
  return rows;
};

// Add to wishlist (or restore)
export const addToWishlist = async (userId, productId) => {
  const [existing] = await db.query(
    "SELECT * FROM wishlist WHERE UserID = ? AND ProductID = ?",
    [userId, productId]
  );

  if (existing.length > 0) {
    if (existing[0].IsDeleted === 1) {
      await db.query(
        "UPDATE wishlist SET IsDeleted = 0 WHERE WishlistID = ?",
        [existing[0].WishlistID]
      );
      return { restored: true };
    }
    return { alreadyExists: true };
  }

  await db.query(
    "INSERT INTO wishlist (UserID, ProductID) VALUES (?, ?)",
    [userId, productId]
  );

  return { added: true };
};

// Soft delete
export const removeFromWishlist = async (userId, productId) => {
  const [result] = await db.query(
    "UPDATE wishlist SET IsDeleted = 1 WHERE UserID = ? AND ProductID = ? AND IsDeleted = 0",
    [userId, productId]
  );
  return result.affectedRows;
};
