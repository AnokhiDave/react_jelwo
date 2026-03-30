import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

// MUI Icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Reels() {
  const [reels, setReels] = useState([]);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  /* ================= FETCH REELS ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/reels")
      .then((res) => {
        setReels(res.data || []);
      })
      .catch((err) => console.error("Reels fetch error:", err));
  }, []);

  /* ================= SCROLL ================= */
  const scroll = (dir) => {
    if (!sliderRef.current) return;

    const width = sliderRef.current.offsetWidth || 300;

    sliderRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  /* ================= ADD TO CART ================= */
  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login first",
        });
        navigate("/login");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId: item.ProductID,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.dispatchEvent(new Event("cartUpdated"));
      window.dispatchEvent(new Event("openCart"));

      Swal.fire({
        icon: "success",
        title: "Added to cart",
        timer: 1000,
        showConfirmButton: false,
      });

    } catch (err) {
      console.error("Cart error:", err.response?.data || err);

      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to add to cart",
        "error"
      );
    }
  };

  return (
    <>
      {/* ================= YOUR CSS (UNCHANGED) ================= */}
      <style>{`
        .reels-section {
          padding: 120px 55px;
          font-family: "Poppins", sans-serif;
        }

        .reels-title {
          text-align: center;
          font-size: 34px;
          margin-bottom: 40px;
          font-family: "Playfair Display", serif;
        }

        .reels-wrapper {
          position: relative;
        }

        .reels-slider {
          display: flex;
          gap: 26px;
          overflow-x: auto;
          scroll-behavior: smooth;
        }

        .reels-slider::-webkit-scrollbar {
          display: none;
        }

        .reel-card {
          min-width: 220px;
          max-width: 220px;
          position: relative;
        }

        .reel-card video {
          width: 100%;
          height: 380px;
          object-fit: cover;
        }

        .reel-overlay {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 14px;
          color: #fff;
        }

        .reel-thumb {
          width: 50px;
          height: 60px;
          background: #fff;
          padding: 4px;
          margin-bottom: 6px;
        }

        .reel-thumb img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .reel-overlay h6 {
          font-size: 14px;
          margin-bottom: 4px;
        }

        .reel-overlay p {
          font-size: 13px;
          margin-bottom: 10px;
        }

        .reel-btn {
          background: #b08968;
          border: none;
          color: #fff;
          padding: 8px 18px;
          border-radius: 20px;
          font-size: 12px;
          cursor: pointer;
        }

        .reel-arrow {
          position: absolute;
          bottom: -45px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .reel-arrow.left {
          left: 46%;
        }

        .reel-arrow.right {
          left: 54%;
        }

        @media (max-width: 576px) {
          .reel-card {
            min-width: 180px;
            max-width: 180px;
          }

          .reel-card video {
            height: 300px;
          }
        }

        @media (max-width: 320px) {
          .reels-slider {
            gap: 0;
          }

          .reel-card {
            min-width: 100%;
            max-width: 100%;
          }

          .reel-card video {
            height: 260px;
          }

          .reel-arrow.left {
            left: 42%;
          }

          .reel-arrow.right {
            left: 58%;
          }
        }
      `}</style>

      {/* ================= SECTION ================= */}
      <section className="reels-section">
        <div className="container">
          <h2 className="reels-title">Watch & Shop Reels</h2>

          <div className="reels-wrapper">
            <div className="reels-slider" ref={sliderRef}>
              {reels.length === 0 && (
                <p style={{ padding: "20px" }}>No reels available</p>
              )}

              {reels.map((item) => (
                <div className="reel-card" key={item.ReelID}>
                  <video
                    src={`http://localhost:5000/images/Reels/${item.ReelVideo}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />

                  <div className="reel-overlay">
                    <div className="reel-thumb">
                      <img
                        src={`http://localhost:5000/images/Jewelry/${item.prod_image}`}
                        alt={item.prod_title}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/60x80?text=No+Image";
                        }}
                      />
                    </div>

                    <h6>{item.prod_title}</h6>
                    <p>₹{item.prod_price}</p>

                    <button
                      className="reel-btn"
                      onClick={() => addToCart(item)}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="reel-arrow left" onClick={() => scroll("left")}>
              <ArrowBackIosNewIcon fontSize="small" />
            </div>

            <div className="reel-arrow right" onClick={() => scroll("right")}>
              <ArrowForwardIosIcon fontSize="small" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}