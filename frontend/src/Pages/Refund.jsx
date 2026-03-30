import React from "react";
import Swal from "sweetalert2";

// MUI Icons
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

export default function Refund() {

  const contactSupport = () => {
    Swal.fire({
      icon: "info",
      title: "Need Help?",
      text: "For refund-related questions, please contact support@store.com",
      confirmButtonText: "OK",
    });
  };

  return (
    <>
      {/* ================= STYLES ================= */}
      <style>{`
        .refund-hero {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

         b, strong {
            font-size: 16px;
          }
        }

        .refund-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
        }

        .refund-hero-content {
          position: relative;
          z-index: 2;
          padding: 0 15px;
        }

        .refund-hero h1 {
          font-size: 44px;
          font-weight: 600;
        }

        .refund-hero p {
          font-size: 13px;
          letter-spacing: 1px;
          opacity: 0.9;
        }

        .refund-section {
          padding: 80px 0;
          font-family: "Poppins", sans-serif;
        }

        .refund-box h6 {
          font-size: 18px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .refund-box p {
          font-size: 16px;
          color: #777;
          line-height: 1.8;
        }

        .refund-box ul {
          padding-left: 18px;
        }

        .refund-box ul li {
          font-size: 13px;
          color: #555;
          margin-bottom: 8px;
        }

        /* Container width */
        @media (min-width: 1200px) {
          .container {
            max-width: 1300px;
          }
        }

        /* Tablet */
        @media (max-width: 768px) {
          .refund-hero h1 {
            font-size: 32px;
          }
        }

        /* Mobile */
        @media (max-width: 576px) {
          .refund-section {
            padding: 50px 0;
          }

          .refund-hero {
            height: 120px;
          }

          .refund-hero h1 {
            font-size: 26px;
          }

          .refund-box h6 {
            font-size: 15px;
          }
        }

        /* Small Mobile ≤320px */
        @media (max-width: 320px) {
          .refund-hero {
            height: 105px;
          }

          .refund-hero h1 {
            font-size: 22px;
          }

          .refund-hero p {
            font-size: 11px;
          }

          .refund-box p {
            font-size: 13px;
          }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <section className="refund-hero">
        <div className="container">
          <div className="refund-hero-content">
            <p>HOME › REFUND POLICY</p>
            <h1>Refund policy</h1>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="refund-section">
        <div className="container">
          <div className="row g-5">

            {/* LEFT COLUMN */}
            <div className="col-lg-6">
              <div className="refund-box">
                <p>
                  We have a 30-day return policy, which means you have 30 days
                  after receiving your item to request a return.
                </p>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                <ul>
                  <li><strong>The Green to Wear 2.0 standard aims to minimize</strong></li>
                  <li><strong>The Green to Wear 2.0 standard aims to minimize</strong></li>
                </ul>
              </div>

              <div className="refund-box mt-4">
                <h6>
                  Damages and Issues
                </h6>
                <p>
                  Please inspect your order upon reception and contact us
                  immediately if the item is defective, damaged or if you
                  receive the wrong item.
                </p>
              </div>

              <div className="refund-box mt-4">
                <h6>
                  Exchanges
                </h6>
                <ul>
                  <li>
                    <strong>Examples of personal information collected:</strong>
                    <p>
                      The Green to Wear 2.0 standard aims to minimize the
                      environmental impact of textile production.
                    </p>
                  </li>
                  <li>
                    <strong>Purpose of collection:</strong>
                    <p>
                      The Green to Wear 2.0 standard aims to minimize the
                      environmental impact of textile production.
                    </p>
                  </li>
                </ul>
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
              <div className="refund-box">
                <p>
                  You can always contact us for any return question at
                  <strong> support@store.com</strong>
                </p>
                <ul>
                  <li><strong>The Green to Wear 2.0 standard aims to minimize</strong></li>
                  <li><strong>The Green to Wear 2.0 standard aims to minimize</strong></li>
                </ul>
              </div>

              <div className="refund-box mt-4">
                <h6>
                  Exceptions / Non-Returnable Items
                </h6>
                <p>
                  Certain types of items cannot be returned, such as perishable
                  goods, custom products, and personal care goods.
                </p>
              </div>

              <div className="refund-box mt-4">
                <h6>
                  Refunds
                </h6>
                <ul>
                <li><strong>Examples of Personal Information collected:</strong>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                </li>
                <li><strong>Purpose of collection:</strong>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the
                  environmental impact of textile production.
                </p>
                </li>
                </ul>
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
          </div>
        </div>
      </section>
    </>
  );
}
