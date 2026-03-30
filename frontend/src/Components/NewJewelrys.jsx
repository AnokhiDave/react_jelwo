import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosAuth from "../api/axiosAuth";
import Swal from "sweetalert2";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function ProductSlider() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState({});
  const [wishlist, setWishlist] = useState([]);

  // 🔹 FETCH PRODUCTS (PUBLIC)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 FETCH WISHLIST (PROTECTED)
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
      Swal.fire("Session expired", "Please login again", "warning");
    }
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

  const addToCart = async (product, id, e) => {
    e.stopPropagation();

    try {
      const quantity = qty[id] || 1;

      await axiosAuth.post("/cart", {
        productId: id,
        quantity,
      });

      // 🔥 OPEN CART SIDEBAR
      window.dispatchEvent(new Event("openCart"));

      // optional: update cart count
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      Swal.fire(
        "Session expired",
        "Please login again",
        "warning"
      );
    }
  };

  return (
    <>
      {/* ================= CSS (SAME FILE) ================= */}
      <style>{`
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
          cursor: pointer;
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

        .product-info {
          padding: 20px;
          border-top: 1px solid #eee;
          text-align: center;
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
          text-transform: uppercase;
        }

        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }
      `}</style>

      <section className="new-jewelry">
        <div className="container">
          <h2 className="section-title">New Jewelry</h2>

          <div className="container my-5">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={4}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              breakpoints={{
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: 4 },
              }}
            >
              {products.map((p) => (
                <SwiperSlide key={p.prod_id}>
                  <div
                    className="product-card"
                    onClick={() =>
                      navigate(`/product-details/${p.prod_id}`)
                    }
                  >
                    {p.prod_discount && (
                      <span className="discount">{p.prod_discount}</span>
                    )}

                    <div className="product-img">
                      <img
                        src={`http://localhost:5000/images/Jewelry/${p.prod_image}`}
                        alt={p.prod_title}
                      />

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

                        <span onClick={(e) => e.stopPropagation()}>
                          <VisibilityOutlinedIcon />
                        </span>
                      </div>
                    </div>

                    <div className="product-info">
                      <small>{p.prod_category || "JEWELRY"}</small>
                      <h6>{p.prod_title}</h6>
                      <div className="price-box">
                        <span className="price">
                          Rs. {p.prod_price}
                        </span>
                        {p.prod_oldprice && (
                          <span className="old">
                            Rs. {p.prod_oldprice}
                          </span>
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
                        <button onClick={(e) => decreaseQty(p.prod_id, e)}> - </button>
                        <span>{qty[p.prod_id] || 1}</span>
                        <button onClick={(e) => increaseQty(p.prod_id, e)}> + </button>
                      </div>

                      <button className="add-cart" onClick={(e) => addToCart(p, p.prod_id, e) }>
                        ADD TO CART
                      </button>

                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
