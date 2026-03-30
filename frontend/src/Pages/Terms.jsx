import React from "react";
import Swal from "sweetalert2";

// MUI Icons (kept for future use if needed)
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

export default function Terms() {

  const acceptTerms = () => {
    Swal.fire({
      icon: "success",
      title: "Terms Accepted",
      text: "Thank you for accepting our Terms & Conditions.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <>
      {/* ================= STYLES ================= */}
      <style>{`
        .terms-hero {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .terms-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
        }

        .terms-hero-content {
          position: relative;
          z-index: 2;
          padding: 0 15px;
        }

        .terms-hero h1 {
          font-size: 42px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .terms-hero p {
          font-size: 14px;
          letter-spacing: 1px;
          opacity: 0.9;
          margin-bottom: 0;
        }

        .terms-section {
          padding: 80px 0;
          font-family: "Poppins", sans-serif;
        }

        .terms-box h6 {
          font-size: 17px;
          font-weight: 600;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .terms-box p {
          font-size: 15px;
          color: #777;
          line-height: 1.8;
        }

        /* Container width */
        @media (min-width: 1200px) {
          .container {
            max-width: 1300px;
          }
        }

        /* Tablet */
        @media (max-width: 768px) {
          .terms-hero {
            height: 140px;
          }

          .terms-hero h1 {
            font-size: 32px;
          }

          .terms-box h6 {
            font-size: 16px;
          }

          .terms-box p {
            font-size: 14px;
          }
        }

        /* Mobile */
        @media (max-width: 576px) {
          .terms-section {
            padding: 50px 0;
          }

          .terms-hero {
            height: 120px;
          }

          .terms-hero h1 {
            font-size: 26px;
          }

          .terms-hero p {
            font-size: 12px;
          }

          .terms-box h6 {
            font-size: 15px;
          }

          .terms-box p {
            font-size: 14px;
          }
        }

        /* SMALL MOBILE ≤320px */
        @media (max-width: 320px) {
          .terms-hero {
            height: 105px;
          }

          .terms-hero h1 {
            font-size: 22px;
          }

          .terms-hero p {
            font-size: 11px;
            letter-spacing: 0.5px;
          }

          .terms-box h6 {
            font-size: 14px;
          }

          .terms-box p {
            font-size: 13px;
            line-height: 1.6;
          }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <section className="terms-hero">
        <div className="container">
          <div className="terms-hero-content">
            <p>HOME › TERMS & CONDITION</p>
            <h1>Terms & Condition</h1>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="terms-section">
        <div className="container">
          <div className="row g-5">

            {/* LEFT COLUMN */}
            <div className="col-lg-6">
              <div className="terms-box">
                <h6>Term & Condition Overview</h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production. To this end,
                  we have developed Inditex’s The List program.
                </p>
              </div>

              <div className="terms-box mt-4">
                <h6>Online Store Terms</h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
              </div>

              <div className="terms-box mt-4">
                <h6>Completeness and Timeliness of Information</h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
              </div>

              <div className="terms-box mt-4">
                <h6>Products or Services (If Applicable)</h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
              </div>

              <div className="terms-box mt-4">
                <h6>Optional Tools</h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-lg-6">
              <div className="terms-box">
                <h6>Last Updated: March 25, 2023</h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
              </div>

              <div className="terms-box mt-4">
                <h6>General Conditions</h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
              </div>

              <div className="terms-box mt-4">
                <h6>Modifications to the Service and Prices</h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
              </div>

              <div className="terms-box mt-4">
                <h6>Accuracy of Billing and Account Information</h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
              </div>

              <div className="terms-box mt-4">
                <h6>Third-Party Links</h6>
                <p>
                  You agree to comply with all applicable laws and regulations
                  while using our services.
                </p>
                <p>We have a 30-day return policy, which means you have 30 days after receiving your item to request a return. </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
