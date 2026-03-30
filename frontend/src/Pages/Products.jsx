import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import axiosAuth from "../api/axiosAuth";

// MUI Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function Product() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const [filters, setFilters] = useState({
    category: category || "",
    minPrice: "",
    maxPrice: "",
    color: "",
    stock: "",
  });

  useEffect(() => {
    if (category) {
      setFilters(prev => ({
        ...prev,
        category: category
      }));
    }
  }, [category]);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();

        Object.keys(filters).forEach((key) => {
          if (filters[key] !== "" && filters[key] !== false) {
            params.append(key, filters[key]);
          }
        });

        const res = await axios.get(
          `http://localhost:5000/api/products/filter?${params.toString()}`
        );

        setProducts(res.data);

        const initialQty = {};
        res.data.forEach((p) => {
          initialQty[p.prod_id] = 1;
        });
        setQty(initialQty);

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  /* ================= FETCH WISHLIST ================= */
  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setWishlist([]);
      return;
    }

    try {
      const res = await axiosAuth.get("/wishlist");
      setWishlist(Array.isArray(res.data) ? res.data : []);
    } catch {
      setWishlist([]);
    }
  };

  /* ================= HELPERS ================= */
  const isInWishlist = (productId) => {
    if (!Array.isArray(wishlist)) return false;
    return wishlist.some((item) => item.ProductID === productId);
  };

  const toggleWishlist = async (e, productId) => {
    e.stopPropagation();
    try {
      if (isInWishlist(productId)) {
        await axiosAuth.delete(`/wishlist/${productId}`);
        window.dispatchEvent(new Event("wishlistUpdated"));
      } else {
        await axiosAuth.post("/wishlist", { productId });
        window.dispatchEvent(new Event("wishlistUpdated"));

      }
      fetchWishlist();
    } catch {
      Swal.fire("Login required", "Please login to use wishlist", "warning");
    }
  };

  /* ================= QTY ================= */
  const increaseQty = (id) => {
    setQty(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decreaseQty = (id) => {
    setQty(prev => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1
    }));
  };

  // Add to Cart
  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire("Login required", "Please login to add products to cart", "warning");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId,
          quantity: qty[productId],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Added to cart",
        text: `Quantity: ${qty[productId]}`,
        timer: 1500,
        showConfirmButton: false,
      });

      window.dispatchEvent(new Event("cartUpdated"));
      window.dispatchEvent(new Event("openCart"));

    } catch (err) {
      Swal.fire("Error", "Failed to add to cart", "error");
    }
  };

  if (loading) {
    return (
      <h3 style={{ textAlign: "center", marginTop: "100px" }}>
        Loading products...
      </h3>
    );
  }
  return (
    <>
     {/* ================= STYLES ================= */}
      <style>{`
        body {
          font-family: "Poppins", sans-serif;
        }

        /* HERO */
        .product-hero {
          height: 160px;
          background: url("/images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        .product-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
        }

        .product-hero-content {
          position: relative;
          z-index: 2;
        }
        .product-hero h1 {
          position: relative;
          z-index: 2;
          font-size: 40px;
          font-weight: 600;
        }

        .product-page {
          padding: 60px 0;
        }

        /* LEFT FILTER */
        .filter-box {
          font-size: 13px;
          margin-bottom: 25px;
        }

        .filter-box h6 {
          font-weight: 600;
          margin-bottom: 12px;
        }
          
        .filter-box ul {
          list-style: none;
          padding: 0;
          max-height: 180px;
          overflow-y: auto;
        }
        .filter-box li {
          margin-bottom: 6px;
          color: #555;
        }
        .filter-box input {
          margin-right: 6px;
        }

        .color-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 8px;
        }

        /* LEFT PROMO */
        .promo-banner {
          position: relative;
          margin-top: 30px;
        }
        .promo-banner img {
          width: 100%;
          border-radius: 10px;
        }

        /* RIGHT MAIN BANNER */
        .category-banner {
          position: relative;
          margin-bottom: 20px;
        }
        .category-banner img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          border-radius: 8px;
        }
        .banner-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 60px;
          color: #fff;
        }
        .banner-overlay span {
          font-size: 11px;
          letter-spacing: 1px;
        }
        .banner-overlay h3 {
          font-size: 28px;
          margin-top: 6px;
          font-weight: 500;
        }

        /* PRODUCT CARD – SAME AS NEWJEWELRYS */
        .product-card {
          background: #f7f7f7;
          border: 1px solid #eee;
          position: relative;
          overflow: hidden;
        }

        .discount {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #28a745;
          color: #fff;
          font-size: 12px;
          padding: 3px 8px;
          border-radius: 3px;
          z-index: 2;
        }

        .product-img {
          padding: 40px 20px;
          position: relative;
          text-align: center;
        }

        .product-img img {
          max-width: 100%;
        }

        .hover-box {
          position: absolute;
          inset: 0;
          background: rgba(176,137,104,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          opacity: 0;
          transition: 0.4s;
        }

        .product-card:hover .hover-box {
          opacity: 1;
        }

        .hover-box span {
          width: 40px;
          height: 40px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .countdown {
          display: flex;
          justify-content: center;
          gap: 15px;
          font-size: 12px;
          margin-top: -30px;
        }

        .product-info {
          padding: 20px;
          border-top: 1px solid #eee;
          text-align: center;
          transition: 0.4s;
        }

        .product-info small {
          color: #aaa;
          font-size: 11px;
          letter-spacing: 1px;
        }

        .product-info h6 {
          font-size: 15px;
          margin: 10px 0;
        }

        .price {
          color: #b08968;
          font-weight: 600;
        }

        .old {
          text-decoration: line-through;
          color: #aaa;
          margin-left: 6px;
        }
        
        /* FILTER BOX */
        .filter-box {
        font-size: 13px;
        margin-bottom: 30px;
        }

        /* PRICE FILTER */
        .price-range input {
        width: 100%;
        accent-color: #b08968;
        }

        .price-value {
        font-size: 12px;
        margin-top: 6px;
        color: #777;
        }

        /* SPECIAL PRODUCT */
        .special-product {
        display: flex;
        gap: 12px;
        margin-bottom: 14px;
        }

        .special-product img {
        width: 60px;
        height: auto;
        border-radius: 6px;
        }

        .special-product h6 {
        font-size: 13px;
        margin: 0;
        line-height: 1.4;
        }

        .special-product span {
        font-size: 12px;
        color: #b08968;
        font-weight: 600;
        }


        .hover-actions {
          position: absolute;
          left: 0;
          bottom: -100%;
          width: 100%;
          height: 127px;
          background: #f7f7f7;
          padding: 20px;
          text-align: center;
          transition: 0.4s;
          border-top: 1px solid #eee;
        }

        /* UPPER PRODUCT BAR */
        .product-topbar {
        padding-bottom: 18px;
        border-bottom: 1px solid #eee;
        margin-bottom: 25px;
        }

        /* DESCRIPTION */
        .product-desc {
        font-size: 14px;
        color: #777;
        max-width: 85%;
        margin-bottom: 18px;
        line-height: 1.7;
        }

        /* CONTROLS ROW */
        .product-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
        }

        /* VIEW ICONS */
        .view-icons {
        display: flex;
        gap: 12px;
        }

        .view-icons .icon {
        font-size: 18px;
        cursor: pointer;
        color: #999;
        }

        .view-icons .icon.active {
        color: #b08968;
        }

        /* PRODUCT COUNT */
        .product-count {
        font-size: 13px;
        color: #777;
        }

        /* SORT */
        .sort-box {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        }

        .sort-box span {
        font-weight: 600;
        }

        .sort-box select {
        border: none;
        background: transparent;
        font-size: 13px;
        outline: none;
        cursor: pointer;
        color: #777;
        }

        /* MOBILE */
        @media (max-width: 576px) {
        .product-desc {
            max-width: 100%;
            font-size: 13px;
        }

        .product-controls {
            justify-content: space-between;
        }
        }


        .product-card:hover .hover-actions {
          bottom: 0;
        }

        .product-card:hover .product-info {
          opacity: 0;
        }

        .size-select {
          width: 50%;
          padding: 8px;
          border: 1px solid #ddd;
          margin-bottom: 12px;
          margin-right: 50%;
        }

        .qty-box {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          margin-left: 50%;
          margin-top: -16%;
        }

        .qty-box button {
          width: 28px;
          height: 30px;
          border: 1px solid #ddd;
          background: #fff;
          cursor: pointer;
          font-weight: 600;
        }

        .add-cart {
          font-size: 13px;
          color: #b08968;
          cursor: pointer;
          font-weight: 600;
        }

        /* MOBILE */
        @media (max-width: 576px) {
          .product-hero {
            height: 120px;
          }
          .product-hero h1 {
            font-size: 26px;
          }
          .hover-actions {
            position: relative;
            bottom: 0;
          }
          .product-info {
            opacity: 1;
          }
        }

        @media (max-width: 320px) {
          .countdown {
            font-size: 10px;
            gap: 8px;
          }
        }
      `}</style>
      {/* HERO */}
      <section className="product-hero">
        <div className="product-hero-content">
          <p>HOME › {category ? category.toUpperCase() : "ALL PRODUCTS"}</p>
          <h1>{category ? category : "All Products"}</h1>
        </div>
      </section>

      {/* PAGE */}
      <section className="product-page">
        <div className="container">
          <div className="row">

            {/* LEFT FILTER */}
            <div className="col-lg-3 d-none d-lg-block">
              <div className="filter-box">
                <h6>Categories</h6>
                <ul>
                  <li><input type="checkbox" /> 14K, 58.3%</li>
                  <li><input type="checkbox" /> 18K, 75.0%</li>
                  <li><input type="checkbox" /> 22K, 91.7%</li>
                  <li><input type="checkbox" /> 24K, 99.9%</li>
                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "BANGLES" })
                      }
                    />
                    Bangles
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "BEST SELLER" })
                      }
                    />
                    Best seller
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "BRACELET" })
                      }
                    />
                    Bracelet
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "BROOCH" })
                      }
                    />
                    Brooch
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "CHAIN" })
                      }
                    />
                    Chain
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "DIAMONDS" })
                      }
                    />
                    Diamonds
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "EARRING" })
                      }
                    />
                    Earring
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "GOLD" })
                      }
                    />
                    Gold
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "JEWELRY" })
                      }
                    />
                    Jewelry
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "MEENAKARI" })
                      }
                    />
                    Meenakari
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "NECKLACE" })
                      }
                    />
                    Necklace
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "NEW PRODUCT" })
                      }
                    />
                    New Product
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "NOSE PIN" })
                      }
                    />
                    Nose Pin
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "PENDANT" })
                      }
                    />
                    Pendant
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "PLATINUM RING" })
                      }
                    />
                    Platinum Ring
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "RING" })
                      }
                    />
                    Ring
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "ROSE GOLD" })
                      }
                    />
                    Rose Gold
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="category"
                      onChange={() =>
                        setFilters({ ...filters, category: "TRENDING PRODUCT" })
                      }
                    />
                    Trending Product
                  </li>
                </ul>
              </div>

              <div className="filter-box">
                <h6>Filter</h6>
              </div>

              <div className="filter-box">
                <h6>Availability</h6>
                <ul>

                  <li>
                    <input
                      type="radio"
                      name="stock"
                      checked={filters.stock === "in"}
                      onChange={() =>
                        setFilters({ ...filters, stock: "in" })
                      }
                    />
                    In stock
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="stock"
                      checked={filters.stock === "out"}
                      onChange={() =>
                        setFilters({ ...filters, stock: "out" })
                      }
                    />
                    Out of stock
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="stock"
                      checked={filters.stock === ""}
                      onChange={() =>
                        setFilters({ ...filters, stock: "" })
                      }
                    />
                    All
                  </li>

                </ul>
              </div>

              <div className="filter-box">
                <h6>Price</h6>

                <div className="price-range">
                  <input
                    type="range"
                    min="0"
                    max="35"
                    value={filters.maxPrice || 35}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        maxPrice: e.target.value
                      })
                    }
                  />
                </div>

                <div className="price-value">
                  Up to ₹{filters.maxPrice || 35}
                </div>

              </div>

              <div className="filter-box">
                <h6>Color</h6>
                <ul>
                  <li><span className="color-dot" style={{ background:"#e6d3a3" }} /> Beige</li>
                  <li><span className="color-dot" style={{ background:"#c68642" }} /> Gold</li>
                  <li><span className="color-dot" style={{ background:"#d4af37" }} /> Rose gold</li>
                  <li><span className="color-dot" style={{ background:"#c0c0c0" }} /> Silver</li>
                  <li><span className="color-dot" style={{ background:"#e6d3a3" }} /> Beige</li>
                  <li><span className="color-dot" style={{ background:"#c68642" }} /> Gold</li>
                  <li><span className="color-dot" style={{ background:"#d4af37" }} /> Rose gold</li>
                  <li><span className="color-dot" style={{ background:"#c0c0c0" }} /> Silver</li>
                  <li><span className="color-dot" style={{ background:"#e6d3a3" }} /> Beige</li>
                  <li><span className="color-dot" style={{ background:"#c68642" }} /> Gold</li>
                  <li><span className="color-dot" style={{ background:"#d4af37" }} /> Rose gold</li>
                  <li><span className="color-dot" style={{ background:"#c0c0c0" }} /> Silver</li>
                </ul>
              </div>

              <div className="filter-box">
                <h6>Special product</h6>

                <div className="special-product">
                    <img src="/images/Jewelry/jewelry-product-51.webp" alt="Gold ring" />
                  <div>
                    <h6>Gold classic ring</h6>
                    <span>₹30.00</span>
                  </div>
                </div>

                <div className="special-product">
                    <img src="/images/Jewelry/jewelry-product-46.webp" alt="Diamond ring" />
                  <div>
                    <h6>Chic diamond ring</h6>
                    <span>₹22.00</span>
                  </div>
                </div>

                <div className="special-product">
                    <img src="/images/Jewelry/jewelry-product-46.webp" alt="Diamond ring" />
                  <div>
                    <h6>Chic diamond ring</h6>
                    <span>₹22.00</span>
                  </div>
                </div>                
              </div>

              <div className="promo-banner">
                <img src="/images/Products/jewelry-4-collection-side-banner.webp" alt="" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-lg-9">

              <div className="category-banner">
                <img src="/images/Products/jewelry-4-collection-banner.webp" alt="" />
              </div>

              <p>
                Care for fiber: 30% more recycled polyester. We label garments
                manufactured using environmentally friendly technologies.
              </p>

              {/* TOP BAR */}
              <div className="product-topbar">
                <div className="product-controls">
                  <div className="view-icons">
                    <span className="icon active">▦</span>
                    <span className="icon">≡</span>
                  </div>

                  <div className="product-count">
                    {products.length} products
                  </div>

                  <div className="sort-box">
                    <span>Sort by:</span>
                    <select>
                      <option>Best selling</option>
                      <option>Price: low to high</option>
                      <option>Price: high to low</option>
                      <option>Newest</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="row g-4">
                {products.map((p, i) => (
                  <div className="col-lg-4 col-md-6 col-sm-6" key={p.prod_id}>
                    <div className="product-card" style={{ cursor: "pointer" }} onClick={() => navigate(`/product-details/${p.prod_id}`)}>

                      {/* DISCOUNT */}
                      {p.prod_discount && (
                        <span className="discount">{p.prod_discount}</span>
                      )}

                      <div className="product-img">
                        <img src={`http://localhost:5000/images/Jewelry/${p.prod_image}`} alt={p.prod_title} />

                        <div className="hover-box">
                          <span
                            onClick={(e) =>
                              toggleWishlist(e, p.prod_id)
                            }
                          >
                            {isInWishlist(p.prod_id) ? (
                              <FavoriteIcon style={{ color: "red" }} />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </span>
                          <span><VisibilityOutlinedIcon /></span>
                        </div>

                        {/* STATIC COUNTDOWN (AS OLD UI) */}
                        <div className="countdown">
                          <div><b>1707</b><br />DAY</div>
                          <div><b>12</b><br />HRS</div>
                          <div><b>54</b><br />MIN</div>
                          <div><b>23</b><br />SEC</div>
                        </div>
                      </div>

                      <div className="product-info">
                        <small>{p.prod_category || "JEWELRY"}</small>
                        <h6>{p.prod_title}</h6>
                        <div>
                          <span className="price">₹{p.prod_price}</span>
                          {p.prod_oldprice && (
                            <span className="old">₹{p.prod_oldprice}</span>
                          )}
                        </div>
                      </div>

                      <div className="hover-actions">
                        <select className="size-select">
                          <option>Gold</option>
                          <option>Silver</option>
                          <option>Rose Gold</option>
                        </select>

                        <div className="qty-box">
                          <button onClick={(e) => { e.stopPropagation(); decreaseQty(p.prod_id); }}>-</button>
                          <span>{qty[p.prod_id]}</span>
                          <button onClick={(e) => { e.stopPropagation(); increaseQty(p.prod_id); }}>+</button>
                        </div>

                        <div className="add-cart" onClick={(e) => { e.stopPropagation(); addToCart(p.prod_id); }}>
                          ADD TO CART
                        </div>

                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
