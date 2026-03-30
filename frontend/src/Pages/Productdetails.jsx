import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Button
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import axiosAuth from "../api/axiosAuth";

/* ================= ACCORDION ITEM ================= */
function AccordionItem({ title, children, defaultOpen = false }) {
  return (
    <Accordion defaultExpanded={defaultOpen}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <strong>{title}</strong>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

/* ================= MAIN COMPONENT ================= */
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [qty, setQty] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [wishlist, setWishlist] = useState([]);
  const [recommended, setRecommended] = useState([]);

  /* ================= FETCH PRODUCT + RECOMMENDED ================= */
  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setQty({ [res.data.prod_id]: 1 });
        setActiveImg(res.data.prod_image);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    axios
      .get("http://localhost:5000/api/products")
      .then((res) =>
        setRecommended(res.data.filter((p) => p.prod_id !== parseInt(id)))
      );
  }, [id]);

  /* ================= WISHLIST LOGIC (FIXED) ================= */
  const fetchWishlist = async () => {
    try {
      const res = await axiosAuth.get("/wishlist");
      setWishlist(res.data);
    } catch {
      setWishlist([]);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.ProductID === productId);

  const toggleWishlist = async () => {
    try {
      if (isInWishlist(product.prod_id)) {
        await axiosAuth.delete(`/wishlist/${product.prod_id}`);
        window.dispatchEvent(new Event("wishlistUpdated"));
      } else {
        await axiosAuth.post("/wishlist", {
          productId: product.prod_id
        });
        window.dispatchEvent(new Event("wishlistUpdated"));
      }
      fetchWishlist();
    } catch {
      alert("Please login to use wishlist");
    }
  };

  // Add to cart
  const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire("Login required", "Please login to add items to cart", "warning");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId,
          quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      Swal.fire({
        icon: "success",
        title: "Added to cart",
        text: `Quantity: ${quantity}`,
        timer: 1500,
        showConfirmButton: false
      });

      window.dispatchEvent(new Event("cartUpdated"));
      window.dispatchEvent(new Event("openCart"));
    } catch (err) {
      Swal.fire("Error", "Failed to add to cart", "error");
    }
  };

  /* ================= EARLY RETURNS ================= */
  if (loading) {
    return <div className="text-center my-5">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center my-5">Product not found</div>;
  }

  /* ================= DERIVED DATA ================= */
  const thumbs = product.prod_thumb ? product.prod_thumb.split(",") : [];
  const prod_sizes = product.prod_size ? product.prod_size.split(",") : [];
  const prod_colors = product.prod_color ? product.prod_color.split(",") : [];

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
  return (
    <>
      {/* ================= CSS (ONE TAG ONLY) ================= */}
      <style>{`
        .banner-btnn {
          width: fit-content;
          padding: 10px 28px;
          border-radius: 30px;
          background: #b08968;
          color: #fff;
          border: none;
          font-size: 14px;
          letter-spacing: 1px;
        }
        .product-title {
          font-size: 26px;
          font-weight: 600;
        }
        .price {
          font-size: 26px;
          font-weight: 700;
          color: #c69c6d;
        }
        .old-price {
          text-decoration: line-through;
          color: #999;
          font-size: 14px;
        }
        .sale-badge {
          background: #28a745;
          color: #fff;
          padding: 3px 8px;
          font-size: 12px;
          border-radius: 4px;
          margin-left: 10px;
        }
        .img-fluid {
          width: 100%;
        }
        .thumb {
          border: 1px solid #ddd;
          width: 157px;
          cursor: pointer;
        }
        .thumb.active {
          border: 1px solid #dee2e6;
        }
        .size-btn {
          border: 1px solid #ddd;
          background: #fff;
          padding: 6px 12px;
          margin-right: 8px;
        }
        .color-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 8px;
          border: 1px solid #ccc;
          cursor: pointer;
        }
        .qty-box {
          width: 100px;
          border: 1px solid #ddd;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 10px;
        }

        .rec-qty-box {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          margin-left: 50%;
          margin-top: -16%;
      }
        .sale-timer {
          background: #ffecec;
          color: #d9534f;
          padding: 10px;
          font-weight: 500;
          border: 1px dashed #d9534f;
        }
        .payment-box {
          background: #faf6f2;
          border-radius: 6px;
        }

        .payment-icons img {
          height: 28px;
          border: 1px solid #ddd;
          padding: 4px 6px;
          border-radius: 4px;
          background: #fff;
        }

        .info-strip {
          border: 1px solid #eee;
          border-radius: 6px;
        }

        .info-icon {
          font-size: 26px;
          margin-bottom: 6px;
          display: block;
        }

        .product-accordion .MuiAccordion-root {
          box-shadow: none;
          border-top: 1px solid #eee;
        }

        .product-accordion .MuiAccordionSummary-root {
          padding: 16px 0;
        }

        .reviews-section {
          padding: 20px 0;
        }

        .review-btn {
          background: #a87c5a !important;
          border-radius: 25px !important;
          padding: 10px 26px !important;
        }

        .review-box {
          border: 1px solid #eee;
          padding: 15px;
          max-width: 400px;
        }

        .description-box {
          padding: 30px 0;
        }

        .desc-img {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 50%;
        }

        .washing-list {
          list-style: none;
          padding-left: 0;
        }

        .washing-list li {
          margin-bottom: 8px;
          padding-left: 24px;
          position: relative;
          font-size: 14px;
          color: #555;
        }

        .washing-list li::before {
          content: "✕";
          position: absolute;
          left: 0;
          color: #333;
          font-weight: bold;
        }

        .additional-info-table table {
          width: 100%;
        }

        .additional-info-table th {
          width: 35%;
          font-weight: 600;
          color: #333;
          padding: 12px 0;
          vertical-align: top;
        }

        .additional-info-table td {
          color: #666;
          padding: 12px 0;
        }

        .additional-info-table tr {
          border-bottom: 1px solid #eee;
        }

        .additional-info-table tr:last-child {
          border-bottom: none;
        }

        .new-jewelry {
          padding: 80px 0;
          font-family: "Poppins", sans-serif;
        }

        .section-title {
          text-align: center;
          font-size: 45px;
          margin-bottom: 50px;
          font-family: "Playfair Display", serif;
        }

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

        /* ICON OVERLAY */
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

        /* COUNTDOWN */
        .countdown {
          display: flex;
          justify-content: center;
          gap: 15px;
          font-size: 12px;
          margin-top: -30px;
        }

        /* PRODUCT INFO */
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

        /* HOVER ACTION PANEL */
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
          margin-left: 55%;
          margin-top: -18%;
        }

        .quantity-box {
          display: flex;
          justify-content: left;
          align-items: center;
          gap: 12px;
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

        .view-btn {
          margin-top: 50px;
          display: flex;
          justify-content: center;
        }

        .view-btn button {
          background: #b08968;
          color: #fff;
          border: none;
          padding: 12px 35px;
          border-radius: 30px;
          font-size: 14px;
        }

        /* MOBILE */
        @media (max-width: 576px) {
          .section-title {
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

        /* SMALL MOBILE ≤320px */
        @media (max-width: 320px) {
          .countdown {
            font-size: 10px;
            gap: 8px;
          }

          .product-img {
            padding: 25px 15px;
          }

          .add-cart {
            font-size: 12px;
          }
        }

        .location-hero {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .location-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
        }

        .location-hero-content {
          position: relative;
          z-index: 2;
          padding: 0 15px;
        }

        .location-hero h1 {
          font-size: 44px;
          font-weight: 600;
        }

        .location-hero p {
          font-size: 13px;
          letter-spacing: 1px;
          opacity: 0.9;
        }

        .location-section {
          padding: 80px 0;
          font-family: "Poppins", sans-serif;
        }

        .store-row {
          align-items: center;
          margin-bottom: 50px;
        }

        .store-img img {
          width: 100%;
        }

        /* ===== PERFECT TEXT STYLE ===== */
        .store-title {
          font-family: "Playfair Display", serif;
          font-size: 40px;
          font-weight: 500;
          margin-bottom: 30px;
        }

        .store-line {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 22px;
        }

        .store-line svg {
          font-size: 30px;
          font-weight: 300;
          margin-top: 3px;
          color: #000;
        }

        .store-label {
          display: block;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 1px;
          color: #000;
          margin-bottom: 4px;
        }

        .store-text {
          font-size: 16px;
          color: #777;
          line-height: 1.6;
          margin: 0;
        }

        .map-btn {
          margin-top: 18px;
          font-size: 13px;
          font-weight: 600;
          color: #b08968;
          cursor: pointer;
          display: inline-block;
        }

          /* =========================================================
          LAPTOP / SMALL DESKTOP (≤1024px)
        ========================================================= */
        @media (max-width: 1024px) {

          .product-title {
            font-size: 24px;
          }

          .price {
            font-size: 24px;
          }

          .section-title {
            font-size: 38px;
          }

          .store-title {
            font-size: 30px;
          }

          .desc-img {
            width: 180px;
            height: 180px;
          }

          .thumb {
            width: 70px;
          }

          .hover-actions {
            padding: 18px;
          }
        }

        /* =========================================================
          TABLET (≤768px)
        ========================================================= */
        @media (max-width: 768px) {

          /* STACK MAIN PRODUCT */
          .col-md-6 {
            width: 100%;
          }

          .product-title {
            font-size: 22px;
            text-align: center;
          }

          .price {
            font-size: 22px;
          }

          .sale-timer {
            text-align: center;
            font-size: 13px;
          }

          /* BUTTONS STACK */
          .d-flex.gap-3.my-4 {
            flex-direction: column;
          }

          .d-flex.gap-3.my-4 button {
            width: 100%;
          }

          /* THUMBNAILS */
          .d-flex.gap-2.mt-3 {
            justify-content: center;
            flex-wrap: wrap;
          }

          .thumb {
            width: 65px;
          }

          /* LOCATION SECTION */
          .store-row {
            flex-direction: column;
            text-align: center;
          }

          .store-title {
            font-size: 26px;
          }

          .banner-btnn {
            margin: auto;
          }

          /* DESCRIPTION */
          .desc-img {
            width: 150px;
            height: 150px;
          }

          /* RECOMMENDED PRODUCTS */
          .section-title {
            font-size: 30px;
          }
        }

        /* =========================================================
          SMALL MOBILE (≤320px)
        ========================================================= */
        @media (max-width: 320px) {

          body {
            overflow-x: hidden;
          }

          .container {
            padding-left: 12px;
            padding-right: 12px;
          }

          /* TEXT */
          .product-title {
            font-size: 19px;
            line-height: 1.3;
          }

          .price {
            font-size: 18px;
          }

          .old-price {
            font-size: 11px;
          }

          /* SALE TIMER */
          .sale-timer {
            font-size: 12px;
          }

          /* SIZE BUTTONS */
          .size-btn {
            font-size: 11px;
            padding: 4px 8px;
          }

          /* QUANTITY */
          .quantity-box {
            gap: 8px;
          }

          .quantity-box button {
            width: 26px;
            height: 26px;
          }

          /* THUMBNAILS */
          .thumb {
            width: 52px;
          }

          /* BUTTONS */
          .d-flex.gap-3.my-4 button {
            font-size: 12px;
            padding: 9px;
          }

          /* PAYMENT */
          .payment-icons {
            flex-wrap: wrap;
            gap: 6px;
          }

          .payment-icons img {
            height: 22px;
          }

          /* LOCATION */
          .store-title {
            font-size: 20px;
          }

          .store-text {
            font-size: 13px;
          }

          .banner-btnn {
            font-size: 12px;
            padding: 8px 18px;
          }

          /* RECOMMENDED PRODUCTS */
          .section-title {
            font-size: 22px;
          }

          .product-info h6 {
            font-size: 13px;
          }

          /* FIX HOVER ON MOBILE */
          .hover-actions {
            position: relative;
            bottom: 0;
            padding: 12px;
          }

          .size-select {
            width: 100%;
            margin-bottom: 8px;
          }

          .qty-box {
            margin: 0 auto 8px;
            justify-content: center;
          }

          .add-cart {
            font-size: 12px;
          }
        }

      `}</style>

      <div className="container my-3">
        <p className="text-muted small">Home / Rose gold rings</p>
        <div className="row">
          {/* LEFT IMAGE SECTION */}
          <div className="col-md-6">
            <img
              src={`http://localhost:5000/images/Jewelry/${activeImg}`}
              alt={product.prod_title}
              className="img-fluid border"
            />

            <div className="d-flex gap-2 mt-3">
              {thumbs.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/images/Jewelry/${img}`}
                  alt="thumb"
                  className={`thumb ${activeImg === img ? "active" : ""}`}
                  onClick={() => setActiveImg(img)}
                />
              ))}
            </div>

          </div>

          {/* RIGHT DETAILS SECTION */}
          <div className="col-md-6">

            <h2 className="product-title">{product.prod_title}</h2>

            <Rating value={5} size="small" readOnly />
            <span className="small text-muted ms-2">1 review</span>
            
            <div className="my-3">
              <span className="price">Rs. {product.prod_price}</span>
              {product.prod_oldprice && (
                <span className="old-price ms-2">Rs. {product.prod_oldprice}</span>
              )}
              <span className="sale-badge">Sale 45%</span>
            </div>

            <p className="text-success">● {product.prod_stock} in stock</p>

            <p className="small text-muted">
              {product.prod_shortdesc}
            </p>

            <div className="sale-timer my-3">
              Hurry up! Sale ends in: <b>1697 : 12 : 44 : 32</b>
            </div>

            {/* SIZE */}
            <div className="my-3">
              <b>Size:</b>
              <div className="mt-2">
                {prod_sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-btn ${selectedSize === s ? "active" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* COLOR */}
            <div className="my-3">
              <b>Color:</b>
              <div className="mt-2 d-flex gap-2">
                {prod_colors.map((c) => (
                  <span
                    key={c}
                    className={`color-dot ${selectedColor === c ? "active" : ""}`}
                    style={{ backgroundColor: c.toLowerCase() }}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </div>
            </div>

            {/* QUANTITY (UNDER COLOR) */}
            <div className="my-3">
              <b>Quantity:</b>
              <div className="quantity-box mt-2">
                <button onClick={() => decreaseQty(product.prod_id)}>-</button>
                <span>{qty[product.prod_id] ?? 1}</span>
                <button onClick={() => increaseQty(product.prod_id)}>+</button>
              </div>
            </div>


            {/* BUTTONS */}
            <div className="d-flex gap-3 my-4">
              <Button variant="outlined" fullWidth onClick={() => addToCart(product.prod_id, qty[product.prod_id] ?? 1)}>
                ADD TO CART
              </Button>

              <Button variant="contained" color="inherit" fullWidth onClick={() => { addToCart(product.prod_id, qty[product.prod_id] ?? 1); navigate("/checkout"); }}>
                BUY IT NOW
              </Button>

            </div>

            {/* ACTION LINKS */}
           <div className="d-flex gap-4 small text-muted">
              <span
                style={{ cursor: "pointer" }}
                onClick={toggleWishlist}
              >
                {isInWishlist(product.prod_id) ? (
                  <FavoriteIcon fontSize="small" style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}{" "}
                Wishlist
              </span>

              <span>
                <HelpOutlineIcon fontSize="small" /> Question
              </span>

              <span>
                <ShareIcon fontSize="small" /> Share
              </span>
            </div>


            <hr />

            <p className="small">
              <b>Delivery:</b> Estimated delivery time: 5–7 days
            </p>
            <p className="small">
              <b>Returns:</b> Within 45 days of purchase
            </p>
            <p className="small">
              <b>SKU:</b> 445
            </p>

            {/* ================= Payment & Security ================= */}
            <div className="mt-4 p-3 payment-box">
            <h6 className="fw-bold mb-3">Payment & Security</h6>

            <div className="d-flex gap-2 mb-3 payment-icons">
                <img src="/images/visa-logo-svgrepo-com.svg" alt="visa" />
                <img src="/images/mastercard-svgrepo-com.svg" alt="mastercard" />
                <img src="/images/amex.svg" alt="amex" />
                <img src="/images/pay-pal-paypal-payments-platform.svg" alt="paypal" />
                <img src="/images/discover.svg" alt="discover" />
            </div>

            <p className="small text-muted">
                Your payment information is processed securely. We do not store credit
                card details nor have access to your credit card information.
            </p>
            </div>

            {/* ================= Info Icons ================= */}
            <div className="info-strip mt-4 p-3">
            <div className="row text-center">
                <div className="col-4">
                <i className="bi bi-geo-alt info-icon"></i>
                <p className="mb-0 fw-semibold">Order tracking</p>
                </div>

                <div className="col-4">
                <i className="bi bi-arrow-repeat info-icon"></i>
                <p className="mb-0 fw-semibold">90 days return</p>
                </div>

                <div className="col-4">
                <i className="bi bi-currency-dollar info-icon"></i>
                <p className="mb-0 fw-semibold">Money guarantee</p>
                </div>
            </div>
            </div>

          </div>
        </div>

        {/* ================= PRODUCT ACCORDION SECTION ================= */}
        <div className="container my-5">
        <div className="product-accordion">

            {/* Video */}
            <AccordionItem title="Video">
            <p className="text-muted">Product video will be displayed here.</p>
            </AccordionItem>

            {/* Description */}
            <AccordionItem title="Description">
                <div className="row align-items-start description-box">

                    {/* LEFT IMAGE */}
                    <div className="col-md-4 text-center mb-4 mb-md-0">
                    <img
                        src="/images/Jewelry/jewelry-product-6.webp"
                        alt="description"
                        className="desc-img"
                    />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="col-md-8">
                    <div className="row">

                        {/* Product Specifications */}
                        <div className="col-md-6 mb-4">
                        <h6 className="fw-bold">Product Specifications</h6>
                        <p className="text-muted small">
                            Care for fiber: 30% more recycled polyester. We label garments
                            manufactured using environmentally friendly technologies and raw
                            materials with the Join Life label.
                        </p>

                        <h6 className="fw-bold mt-3">Washing Instructions</h6>
                        <ul className="washing-list">
                            <li>Iron maximum 100°C.</li>
                            <li>Do not bleach.</li>
                            <li>Do not dry clean.</li>
                        </ul>
                        </div>

                        {/* Material */}
                        <div className="col-md-6">
                        <h6 className="fw-bold">Material</h6>
                        <p className="text-muted small">
                            The Green to Wear 2.0 standard aims to minimize the environmental
                            impact of textile production. To this end, we have developed
                            Inditex’s The List program.
                        </p>

                        <h6 className="fw-bold mt-3">Wearing</h6>
                        <p className="text-muted small mb-1">Model is 1.84 m wearing</p>
                        <p className="text-muted small">Size M</p>
                        </div>

                    </div>
                    </div>
                </div>
            </AccordionItem>

            {/* Additional Info */}
            <AccordionItem title="Additional info">
                <div className="table-responsive additional-info-table">
                    <table className="table table-borderless">
                    <tbody>
                        <tr>
                        <th>Material</th>
                        <td>Rose Gold</td>
                        </tr>
                        <tr>
                        <th>Finish</th>
                        <td>Polished</td>
                        </tr>
                        <tr>
                        <th>Weight</th>
                        <td>Lightweight</td>
                        </tr>
                        <tr>
                        <th>Stone</th>
                        <td>Cubic Zirconia</td>
                        </tr>
                        <tr>
                        <th>Occasion</th>
                        <td>Daily / Party Wear</td>
                        </tr>
                        <tr>
                        <th>Gender</th>
                        <td>Women</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </AccordionItem>


            {/* Return Policies */}
            <AccordionItem title="Return policies">
            <p className="text-muted">
                Provided the conditions in our refund policy have been met, refunds will be processed using the original form of payment. You can return an item purchased online by posting it to us. Please contact customer service for return address. Please note that delivery costs will be excluded from the refund unless goods are returned in accordance with your statutory rights (e.g. they are faulty or not as ordered).
            </p>
            <li className="text-muted">The items with the original receipt are returned within 30 days of purchase.</li>
            <li className="text-muted">Items must be in the original condition as purchased with all labels/tickets attached.</li>
            <p className="text-muted">
                Provided the conditions in our refund policy have been met, refunds will be processed using the original form of payment. You can return an item purchased online by posting it to us. Please contact customer service for return address. Please note that delivery costs will be excluded from the refund unless goods are returned in accordance with your statutory rights (e.g. they are faulty or not as ordered).
            </p>
            </AccordionItem>

            {/* Reviews (OPEN BY DEFAULT) */}
            <AccordionItem title="Review" >
            <div className="reviews-section">
                <h5 className="text-center mb-4">Customer Reviews</h5>

                <div className="row align-items-center mb-4">
                {/* LEFT */}
                <div className="col-md-3 text-center">
                    <Rating value={5} readOnly />
                    <p className="mb-0 fw-semibold">5.00 out of 5</p>
                    <small className="text-muted">Based on 1 review</small>
                </div>

                {/* MIDDLE */}
                <div className="col-md-5">
                    {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="d-flex align-items-center mb-1">
                        <Rating value={star} readOnly size="small" />
                        <div className="progress flex-grow-1 mx-2">
                        <div
                            className={`progress-bar ${
                            star === 5 ? "bg-dark" : "bg-light"
                            }`}
                            style={{ width: star === 5 ? "100%" : "0%" }}
                        ></div>
                        </div>
                        <small>0</small>
                    </div>
                    ))}
                </div>

                {/* RIGHT */}
                <div className="col-md-4 text-center">
                    <Button variant="contained" className="review-btn">
                    WRITE A REVIEW
                    </Button>
                </div>
                </div>

                {/* Review List */}
                <div className="review-box">
                <div className="d-flex justify-content-between">
                    <Rating value={5} readOnly size="small" />
                    <small className="text-muted">04/14/2025</small>
                </div>

                <div className="d-flex align-items-center my-2">
                    <i className="bi bi-person-circle fs-3 me-2"></i>
                    <strong>rgre</strong>
                </div>

                <p className="mb-1 fw-semibold">grgr</p>
                <p className="text-muted mb-0">ggg</p>
                </div>
            </div>
            </AccordionItem>

        </div>
        </div>

        <section className="location-section">
        <div className="container">

          {/* ===== STORE 1 ===== */}
          <div className="row store-row">
            <div className="col-lg-6">
              <div className="store-img">
                <img src="/images/Location/Valsone-shop.webp" alt="Valsone shop" />
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="store-title">New woman fashion arrivals</h2>

              <div className="store-line">
                <div>
                  <p className="store-text">As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze we’re asking women to invite us into their most intimate space.</p>
                </div>
              </div>
              <button className="banner-btnn" onClick={() => handleShop("Exquisite Collection")}> SHOP NOW </button>
            </div>
          </div>

          {/* ===== STORE 2 ===== */}
          <div className="row store-row flex-row-reverse">
            <div className="col-lg-6">
              <div className="store-img">
                <img src="/images/Location/Melbourne-place.webp" alt="Melbourne place" />
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="store-title">I make clothes make fashion</h2>

              <div className="store-line">
                <div>
                  <p className="store-text">As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze we’re asking women to invite us into their most intimate space.</p>
                </div>
              </div>
              <button className="banner-btnn" onClick={() => handleShop("Exquisite Collection")}> SHOP NOW </button>
            </div>
          </div>
        </div>
      </section>


      {/* Recommend */}
      <section className="new-jewelry">
        <div className="container">
          <h2 className="section-title">Recommended Product</h2>

          <div className="row g-4">
            {recommended.slice(0, 4).map((p, i) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={i}>
                <div className="product-card" >
                  {p.prod_discount && <span className="discount">{p.prod_discount}%</span>}

                  <div className="product-img" style={{ cursor: "pointer" }} onClick={() => navigate(`/product-details/${p.prod_id}`)}>
                    <img src={`http://localhost:5000/images/Jewelry/${p.prod_image}`} alt={p.prod_title} />

                    <div className="hover-box">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(e, product.prod_id);
                        }}
                      >
                        {isInWishlist(product.prod_id) ? (
                          <FavoriteIcon style={{ color: "red" }} />
                        ) : (
                        <FavoriteBorderIcon />
                        )}
                      </span>
                      <span><VisibilityOutlinedIcon /></span>
                    </div>

                    <div className="countdown">
                      <div><b>1707</b><br />DAY</div>
                      <div><b>12</b><br />HRS</div>
                      <div><b>54</b><br />MIN</div>
                      <div><b>23</b><br />SEC</div>
                    </div>
                  </div>

                  <div className="product-info">
                    <small>{p.prod_category}</small>
                    <h6>{p.prod_title}</h6>
                    <div>
                      <span className="price">Rs. {p.prod_price}</span>
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
      </section>

      </div>
    </>
  );
}
