import React from "react";
import Swal from "sweetalert2";

// MUI Icons
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

export default function Shipping() {

  const contactSupport = () => {
    Swal.fire({
      icon: "info",
      title: "Need Help?",
      text: "Please contact our support team for shipping or return queries.",
      confirmButtonText: "OK",
    });
  };

  return (
    <>
      {/* ================= STYLES ================= */}
      <style>{`
        .shipping-hero {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .shipping-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
        }

        .shipping-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .shipping-hero p {
          font-size: 14px;
          letter-spacing: 1px;
          opacity: 0.9;
        }

        .shipping-hero h1 {
          font-size: 48px;
          font-weight: 600;
        }

        .shipping-section {
          padding: 80px 0;
          font-family: "Poppins", sans-serif;
        }

        .shipping-box h6 {
          font-size: 18px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .shipping-box p {
          font-size: 16px;
          color: #777;
          line-height: 1.8;
        }
        
        b, strong {
            font-weight: bolder;
            font-size: 17px;
            color: black;
        }

        .shipping-box ul {
          padding-left: 18px;
        }

        .shipping-box ul li {
          font-size: 13px;
          color: black;
          margin-bottom: 8px;
        }

        .icon-title {
          display: flex;
          align-items: center;
          gap: 6px;
        }

         /* CONTAINER WIDTH */
        @media (min-width: 1200px) {
          .container {
            max-width: 1300px;
          }
        }

        /* TABLET */
        @media (max-width: 768px) {
          .shipping-hero {
            height: 140px;
          }

          .shipping-hero h1 {
            font-size: 32px;
          }

          .shipping-box h6 {
            font-size: 16px;
          }

          .shipping-box p {
            font-size: 14px;
          }
        }

        /* MOBILE */
        @media (max-width: 576px) {
          .shipping-section {
            padding: 50px 0;
          }

          .shipping-hero {
            height: 120px;
          }

          .shipping-hero h1 {
            font-size: 26px;
          }

          .shipping-hero p {
            font-size: 12px;
          }

          .shipping-box h6 {
            font-size: 15px;
          }

          .shipping-box p {
            font-size: 14px;
          }

          b, strong {
            font-size: 16px;
          }
        }

        /* SMALL MOBILE ≤320px */
        @media (max-width: 320px) {
          .shipping-hero {
            height: 105px;
          }

          .shipping-hero h1 {
            font-size: 22px;
          }

          .shipping-hero p {
            font-size: 11px;
            letter-spacing: 0.5px;
          }

          .shipping-box h6 {
            font-size: 14px;
          }

          .shipping-box p {
            font-size: 13px;
            line-height: 1.6;
          }

          .shipping-box ul li {
            font-size: 12px;
          }

          b, strong {
            font-size: 13px;
          }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <section className="shipping-hero">
        <div className="container">
          <div className="shipping-hero-content">
            <p>HOME › SHIPPING & RETURN</p>
            <h1>Shipping & Return</h1>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="shipping-section">
        <div className="container">
          <div className="row g-5">

            {/* LEFT COLUMN */}
            <div className="col-lg-6">
              <div className="shipping-box">
                <h6 className="icon-title">
                  Returns
                </h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                <ul>
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                  <li>To this end, we have developed Inditex’s The List program.</li>
                </ul>
              </div>

              <div className="shipping-box mt-4">
                <h6>Exchanges</h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                <ul>
                  <li>
                    <strong>We only replace items if they are defective or damaged.</strong>
                    <p>
                        The Green to Wear 2.0 standard aims to minimize the
                        environmental impact of textile production.
                    </p>
                  </li>
                  <li>
                    <strong>If the item wasn’t marked as a gift when purchased.</strong>
                    <p>
                        The Green to Wear 2.0 standard aims to minimize the
                        environmental impact of textile production.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-lg-6">
              <div className="shipping-box">
                <h6 className="icon-title">
                  Refunds
                </h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                <ul>
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                  <li>To this end, we have developed Inditex’s The List program.</li>
                  <li>The Green to Wear 2.0 standard aims to minimize</li>
                  <li>To this end, we have developed Inditex’s The List program.</li>
                </ul>
              </div>

              <div className="shipping-box mt-4">
                <h6 className="icon-title">
                  Shipping
                </h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                <ul>
                  <li><strong>To return your product</strong>
                    <p>
                        The Green to Wear 2.0 standard aims to minimize the
                        environmental impact of textile production.
                    </p>
                  </li>
                  <li><strong>Depending on where you live</strong>
                    <p>
                        The Green to Wear 2.0 standard aims to minimize the
                        environmental impact of textile production.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
