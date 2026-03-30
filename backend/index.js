import "dotenv/config";

import express from "express";
import cors from "cors";

import userRoutes from "./src/Routes/UserRoute.js";
import addressRoutes from "./src/Routes/AddressRoute.js";
import productsRoutes from "./src/Routes/ProductRoute.js";
import teamRoutes from "./src/Routes/TeamRoute.js";
import testimonialRoutes from "./src/Routes/TestimonialRoute.js";
import blogRoutes from "./src/Routes/BlogRoute.js";
import commentRoutes from "./src/Routes/CommentRoute.js";
import wishlistRoute from "./src/Routes/WishlistRoute.js";
import cartRoutes from "./src/Routes/CartRoute.js";
import orderRoutes from "./src/Routes/OrderRoutes.js";
import contactRoutes from "./src/Routes/ContactRoute.js";
import faqRoutes from "./src/Routes/FaqsRoute.js";
import subscribeRoute from "./src/Routes/SubscribeRoute.js";
import reelsRoute from "./src/Routes/ReelsRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

// Serve images if you store team images in backend
app.use("/images", express.static("images"));

app.use("/api/users", userRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api", contactRoutes);
app.use("/api", faqRoutes);
app.use("/api", subscribeRoute);
app.use("/api/reels", reelsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
