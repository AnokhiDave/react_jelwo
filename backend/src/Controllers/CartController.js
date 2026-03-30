import * as Cart from "../Models/CartModel.js";

// GET
export const getCart = async (req, res) => {
  try {
    const data = await Cart.getCartByUser(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD
export const addCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    await Cart.addToCart(req.user.id, productId, quantity || 1);
    res.status(201).json({ message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE QTY
export const updateQty = async (req, res) => {
  try {
    const { quantity } = req.body;
    await Cart.updateCartQty(req.user.id, req.params.productId, quantity);
    res.json({ message: "Cart updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REMOVE
export const removeCart = async (req, res) => {
  try {
    await Cart.removeFromCart(req.user.id, req.params.productId);
    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CLEAR
export const clearCart = async (req, res) => {
  try {
    await Cart.clearCart(req.user.id);
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
