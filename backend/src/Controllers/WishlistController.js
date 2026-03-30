import * as Wishlist from "../Models/WishlistModel.js";

// GET wishlist
export const getWishlist = async (req, res) => {
  try {
    const data = await Wishlist.getWishlistByUser(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD
export const addWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const result = await Wishlist.addToWishlist(req.user.id, productId);

    if (result.alreadyExists) {
      return res.status(200).json({ message: "Already in wishlist" });
    }

    res.status(201).json({ message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REMOVE
export const removeWishlist = async (req, res) => {
  try {
    await Wishlist.removeFromWishlist(req.user.id, req.params.productId);
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
