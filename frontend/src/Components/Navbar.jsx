
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import axiosAuth from "../api/axiosAuth";
export default function Navbar() {

  const navigate = useNavigate();
  const scrollRef = useRef(null);

  /* ================= STATE ================= */

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const openCartHandler = () => {
    setCartOpen(true);
  };

  /* ================= AUTH + WISHLIST ================= */

  const syncAuthAndWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      setWishlistCount(0);
      return;
    }

    setIsLoggedIn(true);

    try {
      const res = await axiosAuth.get("/wishlist");
      setWishlistCount(res.data.length);
    } catch (err) {
      console.error("Wishlist fetch failed:", err);
      setWishlistCount(0);
    }
  };

  /* ================= FETCH CART ================= */

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartItems([]);
      setCartCount(0);
      setCartSubtotal(0);
      return;
    }

    try {
      const res = await axiosAuth.get("/cart");

      setCartItems(res.data);
      setCartCount(
        res.data.reduce((sum, item) => sum + Number(item.Quantity), 0)
      );

      const subtotal = res.data.reduce(
        (sum, item) =>
          sum + Number(item.prod_price) * Number(item.Quantity),
        0
      );

      setCartSubtotal(subtotal);

    } catch (err) {
      console.error("Cart fetch failed:", err);
    }
  };

  /* ================= UPDATE QTY ================= */

  const updateQty = async (productId, qty) => {
    if (qty <= 0) {
      return removeItem(productId);
    }

    try {
      await axiosAuth.put(`/cart/${productId}`, {
        quantity: qty,
      });

      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      console.error("Update qty failed:", err);
    }
  };

  /* ================= REMOVE ITEM ================= */

  const removeItem = async (productId) => {
    try {
      await axiosAuth.delete(`/cart/${productId}`);

      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  /* ================= LOGOUT ================= */
const handleLogout = () => {
  localStorage.removeItem("token");

  window.dispatchEvent(new Event("auth:changed"));

  Swal.fire({
    icon: "success",
    title: "Logged out",
    timer: 1200,
    showConfirmButton: false,
  });

  navigate("/login", { replace: true });
};

  /* ================= EFFECT ================= */

  useEffect(() => {

    syncAuthAndWishlist();
    fetchCart();

    const handleAuthChange = () => {
      syncAuthAndWishlist();
      fetchCart();
    };

    const handleCartChange = () => {
      fetchCart();
    };

    window.addEventListener("auth:changed", handleAuthChange);
    window.addEventListener("wishlistUpdated", syncAuthAndWishlist);
    window.addEventListener("cartUpdated", handleCartChange);

    window.addEventListener("openCart", openCartHandler);

    return () => {
      window.removeEventListener("auth:changed", handleAuthChange);
      window.removeEventListener("wishlistUpdated", syncAuthAndWishlist);
      window.removeEventListener("cartUpdated", handleCartChange);

      window.removeEventListener("openCart", openCartHandler);
    };

  }, []);

  /* ================= FREE SHIPPING ================= */

  const FREE_SHIPPING_LIMIT = 100;

  const remaining = Math.max(
    0,
    FREE_SHIPPING_LIMIT - cartSubtotal
  );

  const progressPercent = Math.min(
    100,
    (cartSubtotal / FREE_SHIPPING_LIMIT) * 100
  );


  return (
    <>
      <style>{`            
        /* ================= TOP BAR ================= */
        .qty-control button {
          border: 1px solid #ddd;
          background: #fff;
          padding: 3px 8px;
          cursor: pointer;
        }

        .qty-control button:hover {
          background: #b08968;
          color: white;
        }

        .delete-btn {
          border: none;
          background: none;
          cursor: pointer;
          font-size: 16px;
        }

        .top-bar {
          font-size: 14px;
          border-bottom: 1px solid #eee;
          padding: 15px;
        }

        .logo {
          width: 105px;
          height: auto;
        }

        .logo img {
          width: 105px;
        }
        
        a{
          text-decoration:none;
        }

        .sub {
          border-left: 1px solid #e2e2e2;
          padding-left: 30px;
          margin-left: 30px;
          color: #808080;
          font-size: 17px;
        }

        .search-box {
          position: relative;
          width: 350px;
          margin-left: 40px;
        }

        .search-box input {
          width: 100%;
          padding: 10px 40px 10px 15px;
          border-radius: 25px;
          border: 1px solid #ddd;
        }

        .search-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
        }

        /* ================= NAV ================= */
        .main-nav {
          border-top: 1px solid #eee;
          padding: 12px 0;
        }

        /* ===== MEGA MENU ===== */
        .mega-dropdown {
          position: static;
        }

        .line{
          border-left: 1px solid #e2e2e2;
          padding-left: 15px;
        }

        .mega-menu {
          width: 100%;
          left: 0;
          right: 0;
          padding: 10px 56px 10px;
          border-top: 1px solid #eee;
        }

        .mega-menu .mega-title {
          font-weight: 600;
          margin-bottom: 15px;
          color: black;
        }

        .mega-menu ul {
          list-style: none;
          padding: 0;
        }

        .mega-menu ul li {
          margin-bottom: 10px;
          font-size: 14px;
          color: #444;
          cursor: pointer;
        }

        .mega-menu ul li:hover {
          color: #7b4a2f;
        }

        .mega-img {
          position: relative;
        }

        .mega-img img {
          width: 100%;
          height: auto;
          border-radius: 4px;
        }

        .mega-offer {
          position: absolute;
          right: 10px;
          top: 10px;
        }

        .mega-slider {
          position: relative;
        }

        .mega-slider img {
          border-radius: 6px;
        }

        .slider-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #28a745;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .carousel-control-prev,
        .carousel-control-next {
          color: #000;
          font-size: 26px;
          width: auto;
          opacity: 1;
        }

        .carousel-control-prev {
          left: -20px;
        }

        .carousel-control-next {
          right: -20px;
        }

        .navrow{
          gap: 47px;
        }

        .nav-link {
          font-weight: 500;
          color: #000 !important;
          margin: 0 10px;
        }

        .nav-item.dropdown:hover .dropdown-menu {
          display: block;
          margin-top: 0;
        }

        .dropdown-menu {
          border-radius: 0;
          border: 1px solid #eee;
        }

        .dropdown-item {
          font-size: 14px;
          padding: 8px 20px;
        }

        .free-home {
          font-weight: 600;
          color: #7b4a2f;
          cursor: pointer;
        }

        .icon-group a {
          color: black;
        }

        .icon-group{
          display: flex;
          gap: 20px;
        }

        .count{
         font-weight: 500;
        }

        .container{
          max-width: 1445px;
        }

        /* ===== OVERLAY ===== */
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.4);
          z-index: 998;
        }

        /* ===== DRAWER ===== */
        .cart-drawer {
          position: fixed;
          top: 0;
          right: -535px;
          width: 35%;
          height: 100vh;
          background: #fff;
          z-index: 999;
          transition: right 0.35s ease;
          display: flex;
          flex-direction: column;
        }

        .cart-drawer.open {
          right: 0;
          overflow-y: scroll;
        }

        /* ===== FREE SHIPPING ===== */
        .free-ship-box {
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
        }

        .free-ship-text {
          font-size: 14px;
          margin-bottom: 10px;
          color: #000;
        }

        /* Progress bar */
        .free-ship-bar {
          width: 100%;
          height: 6px;
          background: #e6e6e6;
          border-radius: 20px;
          position: relative;
          overflow: visible;
        }

          /* Filled part */
          .free-ship-progress {
            height: 6px;
            background: repeating-linear-gradient(
              45deg,
              #b08968,
              #b08968 6px,
              #c29a78 6px,
              #c29a78 12px
            );
            border-radius: 20px;
            position: relative;
            transition: width 0.4s ease;
          }

          /* Circle container */
          .truck-wrapper {
            position: absolute;
            right: -14px;
            top: 50%;
            transform: translateY(-50%);
            width: 28px;
            height: 28px;
            background: #b08968;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 0 3px #fff;
          }

          /* White truck icon */
          .truck-icon {
            font-size: 16px !important;
            color: #fff;
          }

        /* ===== HEADER ===== */
        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
        }

        .close-btn {
          cursor: pointer;
          font-size: 20px;
        }

        /* ===== BODY ===== */
        .cart-body {
          flex: 1;
          padding: 60px;
        }

        .cart-icon {
          font-size: 48px !important;
          color: #aaa;
          margin-bottom: 15px;
        }

        .continue-btn {
          background: #b08968;
          border: none;
          color: #fff;
          padding: 12px 25px;
          border-radius: 30px;
          font-weight: 600;
          width: 45%;
          margin-left: 2%;
        }
        
        .continue-btn1 {
          background: #000;
          border: none;
          color: #fff;
          padding: 12px 25px;
          border-radius: 30px;
          font-weight: 600;
          width: 45%;
          margin-left: 53%;
          margin-top: -10%;
        }

        /* ===== RECOMMEND HEADER ===== */
        .cart-recommend-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .cart-arrows span {
          cursor: pointer;
          font-size: 20px;
          margin-left: 12px;
          color: #666;
        }

        .cart-arrows span:hover {
          color: #000;
        }

        /* ===== SLIDER ===== */
        .cart-slider {
          display: flex;
          gap: 26px;
          overflow-x: auto;
          scroll-behavior: smooth;
        }

        .cart-slider::-webkit-scrollbar {
          display: none;
        }

        /* ===== SLIDE ITEM ===== */
        .cart-slide-item {
          min-width: 220px;
          display: flex;
          gap: 12px;
        }

        .cart-slide-item img {
          width: 90px;
          border: 1px solid #eee;
        }

        .cart-slide-item p {
          margin: 0;
          font-size: 15px;
        }

        .cart-slide-item span {
          color: #b08968;
          font-weight: 500;
        }

        .cart-recommend {
          height: 30%;
          padding: 20px;
        }

        .qty-control {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10%;
        }

        .recommend-item {
          display: flex;
          gap: 12px;
          margin-top: 12px;
        }

        .recommend-item img {
          width: 40%;
          border: 1px solid #eee;
        }

        /* ===== PROMO HEADER ===== */
        .cart-promo {
          background: #faf6f2;
          padding: 12px 20px;
          text-align: center;
          font-size: 14px;
        }

        .cart-promo strong {
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        /* ================= HAMBURGER ================= */
        .hamburger {
          display: none;
          cursor: pointer;
        }

        /* ================= MOBILE MENU ================= */
        .mobile-menu {
          background: #fff;
          border-top: 1px solid #eee;
        }

        .mobile-menu-item {
          padding: 14px 20px;
          border-bottom: 1px solid #eee;
          font-weight: 500;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
        }

        .mobile-submenu {
          padding-left: 20px;
          background: #fafafa;
        }

        .mobile-submenu div {
          padding: 10px;
          font-size: 14px;
          color: #555;
        }

        /* ================= RESPONSIVE ================= */
        @media (max-width: 768px) {
          .sub,
          .search-box,
          .icon-group,
          .free-home,
          .nav {
            display: none;
          }

          .hamburger {
            display: block;
          }
        }

        @media (max-width: 320px) {
          .logo img {
            width: 85px;
          }
        }
      `}</style>

      {/* ================= TOP BAR ================= */}
      <div className="container-fluid top-bar">
        <div className="container d-flex justify-content-between align-items-center">
          <a href="/" className="logo">
            <img src="/images/jewelry-4-logo.webp" alt="Logo" />
          </a>

          <span className="sub">Free UK standard delivery on all orders.</span>

          <div className="search-box">
            <input type="text" placeholder="Search product..." />
            <SearchIcon className="search-icon" />
          </div>

          <div className="icon-group">
           {/* USER */}
            {isLoggedIn ? (
              <div className="d-flex align-items-center gap-2">
                <Link to="/profile">
                  <PersonOutlineIcon />
                </Link>
                <span
                  style={{ cursor: "pointer", fontSize: 14 }}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </div>
            ) : (
              <Link to="/login">
                <PersonOutlineIcon />
              </Link>
            )}

           {/* ❤️ WISHLIST */}
            <div className="nav-icon">
              <Link to="/Wishlist">
                <FavoriteBorderIcon />
              </Link>
              <span className="count">({wishlistCount})</span>
            </div>

            <div className="nav-icon" onClick={() => setCartOpen(true)}>
              <ShoppingBagOutlinedIcon />
              <span className="count">({cartCount})</span>
            </div>

            {/* ================= CART OVERLAY ================= */}
            {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)}></div>}

            {/* ================= CART DRAWER ================= */}
            <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>

              {/* PROMO HEADER */}
              <div className="cart-promo">
                New customers save 10% with code <strong>WELCOME10</strong>
              </div>


              {/* Header */}
              <div className="cart-header">
                <h5>My shopping cart</h5>
                <span className="close-btn" onClick={() => setCartOpen(false)}>✕</span>
              </div>
              {/* ===== FREE SHIPPING PROGRESS ===== */}
              <div className="free-ship-box">
                {remaining > 0 ? (
                  <p className="free-ship-text">
                    Spend <strong>Rs. {remaining.toFixed(2)}</strong> more and get
                    <strong> free shipping!</strong>
                  </p>
                ) : (
                  <p className="free-ship-text success">
                    🎉 You’ve unlocked free shipping!
                  </p>
                )}

                <div className="free-ship-bar">
                  <div
                    className="free-ship-progress"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="truck-wrapper">
                      <LocalShippingIcon className="truck-icon" />
                    </div>
                  </div>
                </div>

              </div>

              <div className="cart-body">
                {cartItems.length === 0 ? (
                  <div className="text-center">
                    <ShoppingBagOutlinedIcon className="cart-icon" />
                    <p>Your cart is empty</p>

                    <button className="continue-btn" onClick={() => setCartOpen(false)}>
                      CONTINUE SHOPPING
                    </button>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div className="recommend-item" key={item.ProductID}>
                        <img
                          src={`http://localhost:5000/images/Jewelry/${item.prod_image}`}
                          alt={item.prod_title}
                        />
                        <div>
                          <p style={{ fontWeight: 600 }}>{item.prod_title}</p>
                          <span style={{ color: "#b08968", fontWeight: 500 }}>
                            Rs. {(Number(item.prod_price) * item.Quantity).toFixed(2)}
                          </span><br/>
                          {/* QUANTITY COLUMN */}
                        <div className="qty-control">
                        <button disabled={item.Quantity === 1} onClick={() => updateQty(item.ProductID, item.Quantity - 1)}>
                            -
                        </button>

                        <span>{item.Quantity}</span>

                        <button onClick={() => updateQty(item.ProductID, item.Quantity + 1)}>
                            +
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => removeItem(item.ProductID)}
                        >
                            🗑
                        </button>
                        </div>
                        </div>
                      </div>
                    ))}

                  </>
                )}
              </div>

              {/* Divider */}
              <hr />

              {/* Recommended */}
              <div className="cart-recommend">
                <div className="cart-recommend-header">
                  <h6>You might also like</h6>

                  <div className="cart-arrows">
                    <span onClick={() => scrollRef.current.scrollLeft -= 220}>←</span>
                    <span onClick={() => scrollRef.current.scrollLeft += 220}>→</span>
                  </div>
                </div>

                <div className="cart-slider" ref={scrollRef}>
                  {[
                    {
                      img: "/images/Jewelry/jewelry-product-56.webp",
                      name: "Flora diamond bangle",
                      price: "Rs. 28.00",
                    },
                    {
                      img: "/images/Jewelry/jewelry-product-6.webp",
                      name: "Glitter diamond ring",
                      price: "Rs. 10.00",
                    },
                    {
                      img: "/images/Jewelry/jewelry-product-46.webp",
                      name: "Drop gold earrings",
                      price: "Rs. 14.00",
                    },
                  ].map((item, i) => (
                    <div className="cart-slide-item" key={i}>
                      <img src={item.img} alt={item.name} />
                      <div>
                        <p>{item.name}</p>
                        <span>{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
               <hr />

                    <h5 style={{ marginLeft: "5%" }}>
                      Subtotal: Rs. {cartSubtotal.toFixed(2)}
                    </h5>

                    <p style={{ marginLeft: "5%" }}>
                      Taxes, discounts and shipping calculated at checkout.
                    </p>

              <button
                      className="continue-btn"
                      onClick={() => {
                        setCartOpen(false);
                        navigate("/cart");
                      }}
                    >
                      VIEW CART
                    </button>
                    <button
                      className="continue-btn1"
                      onClick={() => {
                        setCartOpen(false);
                        navigate("/Checkout");
                      }}
                    >Checkout
                    </button>

            </div>

          </div>

          <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
      </div>

      {/* ================= DESKTOP NAV (UNCHANGED) ================= */}
      <div className="container-fluid main-nav">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <HeadsetMicOutlinedIcon />
            <span>(220) 123 456 7890</span>
          </div>

          {/* MEGA MENUS HERE */}
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">HOME</Link>
            </li>

            {/* SHOP DROPDOWN */}
            <li className="nav-item dropdown mega-dropdown">
                <a className="nav-link dropdown-toggle" href="#"> SHOP </a>

                <div className="dropdown-menu mega-menu">
                    <div className="row navrow">

                    {/* Earrings */}
                    <div className="col-md-2" >
                          <Link to="/products/EARRING">
                            <div className="mega-title">Earrings</div>
                          </Link>
                        <ul>
                            <Link to="/product-details/1">
                                  <li>Blue heavy t-shirt</li>
                                </Link>
                                <Link to="/product-details/2">
                                  <li>Brown sunglasses</li>
                                </Link>
                                <Link to="/product-details/3">
                                  <li>Bucket shoes</li>
                                </Link>
                                <Link to="/product-details/4">
                                  <li>Floral gold bangle</li>
                                </Link>
                                <Link to="/product-details/5">
                                  <li>Diamond rashmi ring</li>
                                </Link>
                                <Link to="/product-details/6">
                                  <li>Glitter diamond ring</li>
                                </Link>
                        </ul>
                    </div>

                    {/* Necklace */}
                    <div className="col-md-2 line">
                          <Link to="/products/NECKLACE">
                            <div className="mega-title">Necklace</div>
                          </Link>
                        <ul>
                            <Link to="/product-details/7">
                                  <li>Blue heavy t-shirt</li>
                                </Link>
                                <Link to="/product-details/8">
                                  <li>Brown sunglasses</li>
                                </Link>
                                <Link to="/product-details/9">
                                  <li>Bucket shoes</li>
                                </Link>
                                <Link to="/product-details/10">
                                  <li>Floral gold bangle</li>
                                </Link>
                                <Link to="/product-details/11">
                                  <li>Diamond rashmi ring</li>
                                </Link>
                                <Link to="/product-details/12">
                                  <li>Glitter diamond ring</li>
                                </Link>
                        </ul>
                    </div>

                    {/* Rings */}
                    <div className="col-md-2 line">
                          <Link to="/products/RING">
                            <div className="mega-title">Rings</div>
                          </Link>
                        <ul>
                            <Link to="/product-details/1">
                                  <li>Blue heavy t-shirt</li>
                                </Link>
                                <Link to="/product-details/2">
                                  <li>Brown sunglasses</li>
                                </Link>
                                <Link to="/product-details/3">
                                  <li>Bucket shoes</li>
                                </Link>
                                <Link to="/product-details/4">
                                  <li>Floral gold bangle</li>
                                </Link>
                                <Link to="/product-details/5">
                                  <li>Diamond rashmi ring</li>
                                </Link>
                                <Link to="/product-details/6">
                                  <li>Glitter diamond ring</li>
                                </Link>
                        </ul>
                    </div>

                    {/* Bracelets */}
                    <div className="col-md-2 line">
                          <Link to="/products/EARRING">
                            <div className="mega-title">Earrings</div>
                          </Link>
                        <ul>
                            <Link to="/product-details/7">
                                  <li>Blue heavy t-shirt</li>
                                </Link>
                                <Link to="/product-details/8">
                                  <li>Brown sunglasses</li>
                                </Link>
                                <Link to="/product-details/9">
                                  <li>Bucket shoes</li>
                                </Link>
                                <Link to="/product-details/10">
                                  <li>Floral gold bangle</li>
                                </Link>
                                <Link to="/product-details/11">
                                  <li>Diamond rashmi ring</li>
                                </Link>
                                <Link to="/product-details/12">
                                  <li>Glitter diamond ring</li>
                                </Link>
                        </ul>
                    </div>

                    {/* Promo Image */}
                    <div className="col-md-2 mega-img">
                        <img src="../images/Navbar/jewelry-4-menu-banner.webp" alt="Offer" />
                    </div>

                    </div>
                </div>
            </li>

            {/* PRODUCT DROPDOWN */}
            <li className="nav-item dropdown mega-dropdown">
                <a className="nav-link dropdown-toggle" href="#"> PRODUCT </a>

                <div className="dropdown-menu mega-menu">
                    <div className="row navrow">

                        {/* Earrings */}
                        <div className="col-md-2" >
                          <Link to="/products/EARRING">
                            <div className="mega-title">Earrings</div>
                          </Link>
                            <ul>
                                <Link to="/product-details/1">
                                  <li>Blue heavy t-shirt</li>
                                </Link>
                                <Link to="/product-details/2">
                                  <li>Brown sunglasses</li>
                                </Link>
                                <Link to="/product-details/3">
                                  <li>Bucket shoes</li>
                                </Link>
                                <Link to="/product-details/4">
                                  <li>Floral gold bangle</li>
                                </Link>
                                <Link to="/product-details/5">
                                  <li>Diamond rashmi ring</li>
                                </Link>
                                <Link to="/product-details/6">
                                  <li>Glitter diamond ring</li>
                                </Link>  
                            </ul>
                        </div>

                        {/* Bracelets */}
                        <div className="col-md-2 line">
                          <Link to="/products/BRACELET">
                            <div className="mega-title">Bracelets</div>
                          </Link>
                            <ul>
                                <Link to="/product-details/7">
                                  <li>Blue heavy t-shirt</li>
                                </Link>
                                <Link to="/product-details/8">
                                  <li>Brown sunglasses</li>
                                </Link>
                                <Link to="/product-details/9">
                                  <li>Bucket shoes</li>
                                </Link>
                                <Link to="/product-details/10">
                                  <li>Floral gold bangle</li>
                                </Link>
                                <Link to="/product-details/11">
                                  <li>Diamond rashmi ring</li>
                                </Link>
                                <Link to="/product-details/12">
                                  <li>Glitter diamond ring</li>
                                </Link>
                            </ul>
                        </div>

                        {/* Necklace */}
                        <div className="col-md-2 line">
                          <Link to="/products/NECKLACE">
                            <div className="mega-title">Necklace</div>
                          </Link>
                            <ul>
                              <Link to="/product-details/1">
                                  <li>Blue heavy t-shirt</li>
                                </Link>
                                <Link to="/product-details/2">
                                  <li>Brown sunglasses</li>
                                </Link>
                                <Link to="/product-details/3">
                                  <li>Bucket shoes</li>
                                </Link>
                                <Link to="/product-details/4">
                                  <li>Floral gold bangle</li>
                                </Link>
                                <Link to="/product-details/5">
                                  <li>Color print sandal</li>
                                </Link>
                                <Link to="/product-details/6">
                                  <li>Rose gold rings</li>
                                </Link>
                            </ul>
                        </div>

                        {/* Rings */}
                        <div className="col-md-2 line">
                          <Link to="/products/RING">
                            <div className="mega-title">Rings</div>
                          </Link>
                            <ul>
                                <Link to="/product-details/7">
                                  <li>Blue heavy t-shirt</li>
                                </Link>
                                <Link to="/product-details/8">
                                  <li>Brown sunglasses</li>
                                </Link>
                                <Link to="/product-details/9">
                                  <li>Bucket shoes</li>
                                </Link>
                                <Link to="/product-details/10">
                                  <li>Floral gold bangle</li>
                                </Link>
                                <Link to="/product-details/11">
                                  <li>Diamond rashmi ring</li>
                                </Link>
                                <Link to="/product-details/12">
                                  <li>Glitter diamond ring</li>
                                </Link>
                            </ul>
                        </div>

                        {/* Promo Image */}
                        <div className="col-md-2 mega-slider">
                            <div id="productMegaSlider" className="carousel slide" data-bs-ride="carousel">
                                
                                <div className="carousel-inner">

                                    <div className="carousel-item active">
                                        <img src="../images/Jewelry/jewelry-product-6.webp" className="d-block w-100" alt="Product 1"/>
                                        <div className="slider-badge">66%</div>
                                    </div>

                                    <div className="carousel-item">
                                        <img src="../images/Jewelry/jewelry-product-46.webp" className="d-block w-100" alt="Product 2"/>
                                        <div className="slider-badge">64%</div>
                                    </div>

                                    <div className="carousel-item">
                                        <img src="../images/Jewelry/jewelry-product-51.webp" className="d-block w-100" alt="Product 1"/>
                                        <div className="slider-badge">66%</div>
                                    </div>

                                    <div className="carousel-item">
                                        <img src="../images/Jewelry/jewelry-product-56.webp" className="d-block w-100" alt="Product 2"/>
                                        <div className="slider-badge">64%</div>
                                    </div>

                                </div>

                                {/* Arrows */}
                                <button className="carousel-control-prev" type="button" data-bs-target="#productMegaSlider" data-bs-slide="prev"> ‹ </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#productMegaSlider" data-bs-slide="next"> › </button>
                            </div>
                        </div>


                    </div>
                </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Blogs">BLOG</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" > PAGES </a>

              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/Aboutus">About Us</a></li>
                <li><a className="dropdown-item" href="/Contact">Contact</a></li>
                <li><a className="dropdown-item" href="/FAQs">FAQs</a></li>
                <li><a className="dropdown-item" href="/Privacy">Privacy Policy</a></li>
                <li><a className="dropdown-item" href="/refund">Refund Policy</a></li>
                <li><a className="dropdown-item" href="/location">Store Location</a></li>
                <li><a className="dropdown-item" href="/shipping">Shiping & return</a></li>
                <li><a className="dropdown-item" href="/terms">Terms & Conditions</a></li>
              </ul>
            </li>
          </ul>

          <div className="free-home d-flex align-items-center gap-1">
            <HomeOutlinedIcon />
            FREE TRY AT HOME
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="mobile-menu">
          {/* HOME */}
          <div className="mobile-menu-item"><Link className="nav-link" to="/">HOME</Link></div>

          {/* SHOP */}
          <div
            className="mobile-menu-item nav-link"
            onClick={() => { setOpenMenu(openMenu === "shop" ? null : "shop"); setOpenSubMenu(null); }}
          >
            SHOP <span>+</span>
          </div>
          {openMenu === "shop" && (
            <div className="mobile-submenu">
              {["Earrings", "Necklace", "Rings", "Bracelets"].map((cat) => (
                <div key={cat}>
                  <div
                    className="mobile-menu-item"
                    onClick={() => setOpenSubMenu(openSubMenu === cat ? null : cat)}
                  >
                    {cat} <span>+</span>
                  </div>
                  {openSubMenu === cat && (
                    <div className="mobile-submenu">
                      {cat === "Earrings" && (
                        <>
                          <Link to="/product-details/1">
                            <div>Blue heavy t-shirt</div>
                          </Link>
                          <Link to="/product-details/2">
                            <div>Brown sunglasses</div>
                          </Link>
                          <Link to="/product-details/3">
                            <div>Bucket shoes</div>
                          </Link>
                          <Link to="/product-details/4">
                            <div>Floral gold bangle</div>
                          </Link>
                          <Link to="/product-details/5">
                            <div>Diamond rashmi ring</div>
                          </Link>
                          <Link to="/product-details/6">
                            <div>Glitter diamond ring</div>
                          </Link> 
                        </>
                      )}
                      {cat === "Necklace" && (
                        <>
                          <Link to="/product-details/1">
                            <div>Blue heavy t-shirt</div>
                          </Link>
                          <Link to="/product-details/2">
                            <div>Brown sunglasses</div>
                          </Link>
                          <Link to="/product-details/3">
                            <div>Bucket shoes</div>
                          </Link>
                          <Link to="/product-details/4">
                            <div>Floral gold bangle</div>
                          </Link>
                          <Link to="/product-details/5">
                            <div>Color print sandal</div>
                          </Link>
                          <Link to="/product-details/6">
                            <div>Rose gold rings</div>
                          </Link>
                        </>
                      )}
                      {cat === "Rings" && (
                        <>
                          <Link to="/product-details/7">
                            <div>Blue heavy t-shirt</div>
                          </Link>
                          <Link to="/product-details/8">
                            <div>Brown sunglasses</div>
                          </Link>
                          <Link to="/product-details/9">
                            <div>Bucket shoes</div>
                          </Link>
                          <Link to="/product-details/10">
                            <div>Floral gold bangle</div>
                          </Link>
                          <Link to="/product-details/11">
                            <div>Diamond rashmi ring</div>
                          </Link>
                          <Link to="/product-details/12">
                            <div>Glitter diamond ring</div>
                          </Link>
                        </>
                      )}
                      {cat === "Bracelets" && (
                        <>
                          <Link to="/product-details/7">
                            <div>Blue heavy t-shirt</div>
                          </Link>
                          <Link to="/product-details/8">
                            <div>Brown sunglasses</div>
                          </Link>
                          <Link to="/product-details/9">
                            <div>Bucket shoes</div>
                          </Link>
                          <Link to="/product-details/10">
                            <div>Floral gold bangle</div>
                          </Link>
                          <Link to="/product-details/11">
                            <div>Diamond rashmi ring</div>
                          </Link> 
                          <Link to="/product-details/12">
                            <div>Glitter diamond ring</div>
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PRODUCT */}
          <div
            className="mobile-menu-item nav-link"
            onClick={() => { setOpenMenu(openMenu === "product" ? null : "product"); setOpenSubMenu(null); }}
          >
            PRODUCT <span>+</span>
          </div>
          {openMenu === "product" && (
            <div className="mobile-submenu">
              {["Earrings", "Bracelets", "Necklace", "Rings"].map((cat) => (
                <div key={cat}>
                  <div
                    className="mobile-menu-item"
                    onClick={() => setOpenSubMenu(openSubMenu === cat ? null : cat)}
                  >
                    {cat} <span>+</span>
                  </div>
                  {openSubMenu === cat && (
                    <div className="mobile-submenu">
                      {cat === "Earrings" && (
                        <>
                          <Link to="/product-details/1">
                            <div>Blue heavy t-shirt</div>
                          </Link>
                          <Link to="/product-details/2">
                            <div>Brown sunglasses</div>
                          </Link>
                          <Link to="/product-details/3">
                            <div>Bucket shoes</div>
                          </Link>
                          <Link to="/product-details/4">
                            <div>Floral gold bangle</div>
                          </Link>
                          <Link to="/product-details/5">
                            <div>Diamond rashmi ring</div>
                          </Link>
                          <Link to="/product-details/6">
                            <div>Glitter diamond ring</div>
                          </Link>  
                        </>
                      )}
                      {cat === "Bracelets" && (
                        <>
                          <Link to="/product-details/7">
                            <div>Blue heavy t-shirt</div>
                          </Link>
                          <Link to="/product-details/8">
                            <div>Brown sunglasses</div>
                          </Link>
                          <Link to="/product-details/9">
                            <div>Bucket shoes</div>
                          </Link>
                          <Link to="/product-details/10">
                            <div>Floral gold bangle</div>
                          </Link>
                          <Link to="/product-details/11">
                            <div>Diamond rashmi ring</div>
                          </Link> 
                          <Link to="/product-details/12">
                            <div>Glitter diamond ring</div>
                          </Link>
                        </>
                      )}
                      {cat === "Necklace" && (
                        <>
                          <Link to="/product-details/1">
                            <div>Blue heavy t-shirt</div>
                          </Link>
                          <Link to="/product-details/2">
                            <div>Brown sunglasses</div>
                          </Link>
                          <Link to="/product-details/3">
                            <div>Bucket shoes</div>
                          </Link>
                          <Link to="/product-details/4">
                            <div>Floral gold bangle</div>
                          </Link>
                          <Link to="/product-details/5">
                            <div>Color print sandal</div>
                          </Link>
                          <Link to="/product-details/6">
                            <div>Rose gold rings</div>
                          </Link>
                        </>
                      )}
                      {cat === "Rings" && (
                        <>
                          <Link to="/product-details/7">
                            <div>Blue heavy t-shirt</div>
                          </Link>
                          <Link to="/product-details/8">
                            <div>Brown sunglasses</div>
                          </Link>
                          <Link to="/product-details/9">
                            <div>Bucket shoes</div>
                          </Link>
                          <Link to="/product-details/10">
                            <div>Floral gold bangle</div>
                          </Link>
                          <Link to="/product-details/11">
                            <div>Diamond rashmi ring</div>
                          </Link>
                          <Link to="/product-details/12">
                            <div>Glitter diamond ring</div>
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* BLOG */}
          <div className="mobile-menu-item"><a className="nav-link" href="/Blogs">BLOG</a></div>

          {/* PAGES */}
          <div
            className="mobile-menu-item"
            onClick={() => { setOpenMenu(openMenu === "pages" ? null : "pages"); setOpenSubMenu(null); }}
          >
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" > PAGES </a> 
            <span>+</span>
          </div>
          {openMenu === "pages" && (
            <div className="mobile-submenu">
              <div><a className="dropdown-item" href="/Aboutus">About Us</a></div>
              <div><a className="dropdown-item" href="/Contact">Contact</a></div>
              <div><a className="dropdown-item" href="/FAQs">FAQs</a></div>
              <div><a className="dropdown-item" href="/Privacy">Privacy Policy</a></div>
              <div><a className="dropdown-item" href="/refund">Refund Policy</a></div>
              <div><a className="dropdown-item" href="/location">Store Location</a></div>
              <div><a className="dropdown-item" href="/shipping">Shiping & return</a></div>
              <div><a className="dropdown-item" href="/terms">Terms & Conditions</a></div>
            </div>
          )}
        </div>
      )}

    </>
  );
}
