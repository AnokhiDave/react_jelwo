import db from "../Config/db.js";

export const processCheckout = async (
  userId,
  addressId,
  cardNumber
) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1️⃣ Get Cart Items with price & stock
    const [cartItems] = await connection.query(
      `SELECT 
         c.ProductID, 
         c.Quantity, 
         p.prod_price, 
         p.prod_stock
       FROM cart c
       JOIN products p ON c.ProductID = p.prod_id
       WHERE c.UserID = ? AND c.IsDeleted = 0`,
      [userId]
    );

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    // 2️⃣ Calculate Subtotal + Validate Stock
    let subtotal = 0;

    for (let item of cartItems) {
      if (item.Quantity > item.prod_stock) {
        throw new Error("Insufficient stock for one or more products");
      }

      subtotal += item.prod_price * item.Quantity;
    }

    const shipping = 0; // Free shipping
    const total = subtotal + shipping;

    // 3️⃣ Insert Order
    const [orderResult] = await connection.query(
      `INSERT INTO orders
       (UserID, AddressID, Subtotal, Shipping, TotalAmount, OrderStatus)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, addressId, subtotal, shipping, total, "Paid"]
    );

    const orderId = orderResult.insertId;

    // 4️⃣ Insert Order Items + Reduce Stock
    for (let item of cartItems) {
      await connection.query(
        `INSERT INTO order_items
         (OrderID, ProductID, Price, Quantity)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.ProductID, item.prod_price, item.Quantity]
      );

      await connection.query(
        `UPDATE products
         SET prod_stock = prod_stock - ?
         WHERE prod_id = ?`,
        [item.Quantity, item.ProductID]
      );
    }

    // 5️⃣ Save Payment (store only last 4 digits)
    const last4 = cardNumber.slice(-4);

    await connection.query(
      `INSERT INTO payments
       (OrderID, UserID, PaymentMethod, CardLast4, Amount, PaymentStatus)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [orderId, userId, "Card", last4, total, "Paid"]
    );

    // 6️⃣ Clear Cart
    await connection.query(
      `DELETE FROM cart WHERE UserID = ?`,
      [userId]
    );

    await connection.commit();
    connection.release();

    return orderId;

  } catch (error) {
    await connection.rollback();
    connection.release();
    throw error;
  }
};
