// import React from "react";

// export default function Register() {

//   return (
//     <>
//       <style>
//         {`
//           .wishlist-header {
//             height: 165px;
//             background: url("../images/Main-Header.webp") center/cover no-repeat;
//             position: relative;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #fff;
//             text-align: center;
//           }

//           .wishlist-header::after {
//             content: "";
//             position: absolute;
//             inset: 0;
//             background: rgba(0,0,0,0.35);
//           }

//           .wishlist-header-content {
//             position: relative;
//             z-index: 1;
//           }

//           .breadcrumb-text {
//             letter-spacing: 2px;
//             font-size: 14px;
//             margin-bottom: 10px;
//           }

//           .wishlist-header h1 {
//             font-family: "Playfair Display", serif;
//             font-size: 48px;
//           }

//           h5 a {
//             text-align: center;
//             font-size: 18px;
//             font-weight: 500;
//             color: black;
//           }

//           h5{
//             padding: 5% 38% 5%;
//           }
//         `}
//       </style>

//       {/* ================= HEADER ================= */}
//       <section className="wishlist-header">
//         <div className="wishlist-header-content">
//           <div className="breadcrumb-text">HOME - WISHLIST</div>
//           <h1>Wishlist</h1>
//         </div>
//       </section>
//       <h5>Your wishlist is empty <a href="/">return to store</a></h5>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosAuth from "../api/axiosAuth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Swal from "sweetalert2";

export default function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [qty, setQty] = useState({});

  const fetchWishlist = async () => {
    try {
      const res = await axiosAuth.get("/wishlist");
      setWishlist(res.data);
    } catch (err) {
      console.error(err);
      setWishlist([]);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    await axiosAuth.delete(`/wishlist/${productId}`);
    window.dispatchEvent(new Event("wishlistUpdated"));
    fetchWishlist();
  };

  const increaseQty = (id, e) => {
    e.stopPropagation();
    setQty({ ...qty, [id]: (qty[id] || 1) + 1 });
  };

  const decreaseQty = (id, e) => {
    e.stopPropagation();
    if ((qty[id] || 1) > 1) {
      setQty({ ...qty, [id]: qty[id] - 1 });
    }
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire("Login required", "Please login to add products to cart", "warning");
      return;
    }

    try {
      await axiosAuth.post("/cart", {
        productId,
        quantity: qty[productId] || 1
      });

      Swal.fire({
        icon: "success",
        title: "Added to cart",
        text: `Quantity: ${qty[productId] || 1}`,
        timer: 1500,
        showConfirmButton: false,
      });

      window.dispatchEvent(new Event("cartUpdated"));
      window.dispatchEvent(new Event("openCart"));

    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add to cart", "error");
    }
  };

  return (
    <>
      {/* ================= CSS (SAME AS PRODUCTSLIDER) ================= */}
      <style>{`
        .wishlist-header {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .wishlist-header::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }

        .wishlist-header-content {
          position: relative;
          z-index: 1;
        }

        .breadcrumb-text {
          letter-spacing: 2px;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .wishlist-header h1 {
          font-family: "Playfair Display", serif;
          font-size: 48px;
        }

        /* PRODUCT CARD – SAME AS PRODUCTSLIDER */
        .product-card {
          background: #f7f7f7;
          border: 1px solid #eee;
          position: relative;
          overflow: hidden;
          cursor: pointer;
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

        .product-info {
          padding: 20px;
          border-top: 1px solid #eee;
          text-align: center;
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

        .hover-actions {
          position: absolute;
          left: 0;
          bottom: -100%;
          width: 100%;
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
          margin-left: 50%;
          margin-top: -18%;
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
          width: 100%;
          margin-top: 12px;
          padding: 12px 0;
          background: #b08968;
          color: #fff;
          border: none;
          border-radius: 30px;
          font-size: 13px;
          letter-spacing: 1px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>

      {/* ================= HEADER ================= */}
      <section className="wishlist-header">
        <div className="wishlist-header-content">
          <div className="breadcrumb-text">HOME - WISHLIST</div>
          <h1>Wishlist</h1>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <div className="container my-5">
        {wishlist.length === 0 ? (
          <h5 className="text-center">
            Your wishlist is empty <a href="/">return to store</a>
          </h5>
        ) : (
          <div className="row g-4">
            {wishlist.map((p) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6"
                key={p.WishlistID}
              >
                <div
                  className="product-card"
                  onClick={() =>
                    navigate(`/product-details/${p.ProductID}`)
                  }
                >
                  <div className="product-img">
                    <img
                      src={`http://localhost:5000/images/Jewelry/${p.prod_image}`}
                      alt={p.prod_title}
                    />

                    <div className="hover-box">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromWishlist(p.ProductID);
                        }}
                      >
                        <FavoriteIcon style={{ color: "red" }} />
                      </span>

                      <span onClick={(e) => e.stopPropagation()}>
                        <VisibilityOutlinedIcon />
                      </span>
                    </div>
                  </div>

                  <div className="product-info">
                    <small>JEWELRY</small>
                    <h6>{p.prod_title}</h6>
                    <span className="price">
                      Rs. {p.prod_price}
                    </span>
                  </div>

                  <div className="hover-actions">
                    <select className="size-select">
                      <option>Gold</option>
                      <option>Silver</option>
                      <option>Rose Gold</option>
                    </select>

                    <div className="qty-box">
                      <button
                        onClick={(e) =>
                          decreaseQty(p.ProductID, e)
                        }
                      >
                        -
                      </button>
                      <span>{qty[p.ProductID] || 1}</span>
                      <button
                        onClick={(e) =>
                          increaseQty(p.ProductID, e)
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="add-cart" onClick={(e) => { e.stopPropagation(); addToCart(p.ProductID); }}>
                      ADD TO CART
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
