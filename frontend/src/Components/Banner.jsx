import React from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

// MUI Icon
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

export default function Banner() {
  const handleShop = (title) => {
    Swal.fire({
      icon: "success",
      title: "Redirecting...",
      text: `Opening ${title}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <style>{`
        .banner-section {
          font-family: "Playfair Display", serif;
          margin-bottom: 5%;
        }

        .banner-card {
          position: relative;
          overflow: hidden;
          border-radius: 6px;
          height: 100%;
        }

        .banner-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .banner-content {
          position: absolute;
          inset: 0;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
         
        }

        .banner-offer {
          font-family: "Poppins", sans-serif;
          font-size: 14px;
          letter-spacing: 1px;
          color: #777;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }

        .banner-title {
          font-size: 50px;
          line-height: 1.1;
          color: #222;
          margin-bottom: 20px;
        }

        .banner-btn {
          width: fit-content;
          padding: 10px 28px;
          border-radius: 30px;
          background: #b08968;
          color: #fff;
          border: none;
          font-size: 14px;
          letter-spacing: 1px;
        }

        .banner-offerr {
          font-family: "Poppins", sans-serif;
          font-size: 14px;
          letter-spacing: 1px;
          color: #777;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
          margin-left: 60%;
        }

        .banner-titlee {
          font-size: 50px;
          line-height: 1.1;
          color: #222;
          margin-bottom: 20px;
          margin-left: 60%;
        }

        .banner-btnn {
          width: fit-content;
          padding: 10px 28px;
          border-radius: 30px;
          background: #b08968;
          color: #fff;
          border: none;
          font-size: 14px;
          letter-spacing: 1px;
          margin-left: 60%;
        }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 992px) {
          .banner-title {
            font-size: 34px;
          }

          .banner-titlee {
            font-size: 34px;
          }
        }

        @media (max-width: 576px) {
          .banner-content {
            padding: 25px;
          }

          .banner-title {
            font-size: 28px;
          }

          .banner-titlee {
            font-size: 28px;
          }
        }

        @media (min-width: 1200px) {
            .container, .container-lg, .container-md, .container-sm, .container-xl {
            max-width: 1445px;
            }
        }

        @media (max-width: 320px) {
          .banner-title {
            font-size: 24px;
          }

          .banner-btn {
            padding: 8px 20px;
            font-size: 12px;
          }
            .banner-titlee {
            font-size: 24px;
          }

          .banner-btnn {
            padding: 8px 20px;
            font-size: 12px;
          }
        }
      `}</style>

      <section className="banner-section">
        <div className="container">
          <div className="row g-4">

            {/* LEFT BANNER */}
            <div className="col-md-6">
              <div className="banner-card">
                <img
                  src="/images/Banner/jewelry-4-banner-1.webp"
                  alt="Exquisite Collection"
                />

                <div className="banner-content">
                  <div className="banner-offerr">
                    <LocalOfferOutlinedIcon fontSize="small" />
                    GET A 30% DISCOUNT
                  </div>

                  <h2 className="banner-titlee">
                    Exquisite <br /> collection
                  </h2>

                  <Button
                    className="banner-btnn"
                    onClick={() => handleShop("Exquisite Collection")}
                    component={Link}
                    to={`/Products`}
                  >
                    SHOP NOW
                  </Button>
                </div>
              </div>
            </div>

            {/* RIGHT BANNER */}
            <div className="col-md-6">
              <div className="banner-card">
                <img
                  src="/images/Banner/jewelry-4-banner-2.webp"
                  alt="Diamond Necklace"
                />

                <div className="banner-content">
                  <div className="banner-offer">
                    <LocalOfferOutlinedIcon fontSize="small" />
                    20% OFF ON WASTAGE
                  </div>

                  <h2 className="banner-title">
                    Diamond <br /> necklace
                  </h2>

                  <Button
                    className="banner-btn"
                    onClick={() => handleShop("Diamond Necklace")}
                    component={Link}
                    to={`/Products`}
                  >
                    SHOP NOW
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}