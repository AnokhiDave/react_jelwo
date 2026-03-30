import React from "react";
import Swal from "sweetalert2";

// MUI Icons
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";

export default function Privacy() {

  const contactPrivacy = () => {
    Swal.fire({
      icon: "info",
      title: "Privacy Support",
      text: "For privacy-related questions contact support@store.com",
      confirmButtonText: "OK",
    });
  };

  return (
    <>
      {/* ================= STYLES ================= */}
      <style>{`
        .privacy-hero {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .privacy-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
        }

        .privacy-hero-content {
          position: relative;
          z-index: 2;
          padding: 0 15px;
        }

        .privacy-hero h1 {
          font-size: 44px;
          font-weight: 600;
        }

        .privacy-hero p {
          font-size: 13px;
          letter-spacing: 1px;
          opacity: 0.9;
        }

        .privacy-section {
          padding: 80px 0;
          font-family: "Poppins", sans-serif;
        }

        .privacy-box h5 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .privacy-box h6 {
          font-size: 18px;
          font-weight: 600;
          margin-top: 18px;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        b, strong {
            font-weight: bolder;
            font-size: 17px;
            color: #777;
        }
        .privacy-box p {
          font-size: 16px;
          color: #777;
          line-height: 1.8;
        }

        .privacy-box ul {
          padding-left: 18px;
        }

        .privacy-box ul li {
          font-size: 13px;
          color: #555;
          margin-bottom: 8px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
        }

        table th,
        table td {
          border: 1px solid #eee;
          padding: 10px;
          font-size: 13px;
          color: #666;
        }

        table th {
          background: #fafafa;
          font-weight: 600;
          text-align: left;
        }

        /* Container width */
        @media (min-width: 1200px) {
          .container {
            max-width: 1300px;
          }
        }

        /* Tablet */
        @media (max-width: 768px) {
          .privacy-hero h1 {
            font-size: 32px;
          }
        }

        /* Mobile */
        @media (max-width: 576px) {
          .privacy-section {
            padding: 50px 0;
          }

          .privacy-hero {
            height: 120px;
          }

          .privacy-hero h1 {
            font-size: 26px;
          }

          .privacy-box h5 {
            font-size: 16px;
          }
        }

        /* Small Mobile ≤320px */
        @media (max-width: 320px) {
          .privacy-hero {
            height: 105px;
          }

          .privacy-hero h1 {
            font-size: 22px;
          }

          .privacy-hero p {
            font-size: 11px;
          }

          .privacy-box p {
            font-size: 13px;
          }

          table th,
          table td {
            font-size: 12px;
          }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <section className="privacy-hero">
        <div className="container">
          <div className="privacy-hero-content">
            <p>HOME › PRIVACY POLICY</p>
            <h1>Privacy policy</h1>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="privacy-section">
        <div className="container">
          <div className="row g-5">

            {/* LEFT COLUMN */}
            <div className="col-lg-6">
              <div className="privacy-box">
                <h5>Collecting personal information</h5>
                <p>
                  When you visit the Site, we collect certain information aboutyour device,
                   your interaction with the Site, and informationnecessary to process your purchases. 
                  We may also collectadditional information if you for customer support.
                </p>

                <h6>Device information</h6>
                <ul>
                  <li><strong>Examples of personal information collected:</strong> 
                  <p>
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                  </p>
                  </li>
                  <li><strong>Purpose of collection:</strong> 
                  <p>
                     The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                  </p>
                  </li>
                  <li><strong>Source of collection:</strong> 
                  <p>
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                  </p>
                  </li>
                </ul>

                <h6>Order information</h6>
                <ul>
                  <li><strong>Examples of personal information collected:</strong> 
                  <p>
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                  </p>
                  </li>
                  <li><strong>Purpose of collection:</strong> 
                  <p>
                     The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                  </p>
                  </li>
                  <li><strong>Source of collection:</strong> 
                  <p>
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                  </p>
                  </li>
                </ul>

                <h6>Customer Support information</h6>
                <ul>
                  <li><strong>Examples of personal information collected:</strong> 
                  <p>
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                  </p>
                  </li>
                  <li><strong>Purpose of collection:</strong> 
                  <p>
                     The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                  </p>
                  </li>
                  <li><strong>Source of collection:</strong> 
                  <p>
                    The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                  </p>
                  </li>
                </ul>
              </div>

              <div className="privacy-box mt-4">
                <h5>Your rights</h5>
                <ul><li><h6>GDPR</h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                </li>
                </ul>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <h6>CCPA</h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
              </div>

              <div className="privacy-box mt-4">
                <h5>Changes</h5>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-lg-6">
              <div className="privacy-box">
                <h5>Sharing personal information</h5>
                <p>
                  By using the Service, You agree to the collection and use ofinformation in accordance with 
                  this Privacy Policy. 
                  This PrivacyPolicy has been created with the help of the TermsFeed PrivacyPolicy Generator. 
                </p>

                <h6>Behavioural advertising</h6>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. 
                </p>
                <p>
                  By using the Service, You agree to the collection and use ofinformation in accordance with 
                  this Privacy Policy. 
                  This PrivacyPolicy has been created with the help of the TermsFeed PrivacyPolicy Generator. 
                </p>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. 
                </p>
                <p>
                    When you visit the Site, we collect certain information aboutyour device, 
                    your interaction with the Site, and information necessary to process your purchases.
                    We may also collectadditional information if you for customer support. 
                </p>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. 
                </p>
              </div>

              <div className="privacy-box mt-4">
                <h5>Selling personal information</h5>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. 
                </p>
                <ul>
                    <li>The Green to Wear 2.0 standard aims to minimize </li>
                    <li>To this end, we have developed Inditex's The List program.</li>
                    <li>The Green to Wear 2.0 standard aims to minimize </li>
                    <li>To this end, we have developed Inditex's The List program.</li>
                </ul>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. 
                </p>
              </div>

              <div className="privacy-box mt-4">
                <h5>Cookies</h5>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. 
                </p>
              </div>

              <div className="privacy-box mt-4">
                <h5>Cookies necessary for the functioning of the store</h5>
                <p>
                  The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. 
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>_dcg</td><td>Store functionality</td></tr>
                    <tr><td>_secure</td><td>Secure login</td></tr>
                    <tr><td>cart_ts</td><td>Cart session</td></tr>
                    <tr><td>secure_customer</td><td>User authentication</td></tr>
                    <tr><td>_shopify_u</td><td>Analytics</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="privacy-box mt-4">
                <h5>Reporting and analytics</h5>
                <p>
                    We have a 30-day return policy, 
                    which means you have 30 days after receiving your item to request a return. 
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>_dcg</td><td>Analytics tracking</td></tr>
                    <tr><td>_secure</td><td>Session tracking</td></tr>
                    <tr><td>cart_ts</td><td>Cart analytics</td></tr>
                    <tr><td>secure_customer</td><td>User behavior</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
