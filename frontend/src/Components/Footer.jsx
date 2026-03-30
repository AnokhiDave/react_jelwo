import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

// Social icons
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Contact icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { createHashRouter, UNSAFE_getTurboStreamSingleFetchDataStrategy } from "react-router-dom";
import { gridLegacyClasses } from "@mui/material/GridLegacy";
import { dividerClasses } from "@mui/material";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      Swal.fire("Oops!", "Please enter your email", "warning");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 201) {
        Swal.fire("Subscribed 🎉", "You got 15% discount!", "success");
        setEmail("");
      } else if (response.status === 409) {
        Swal.fire("Already Subscribed", data.message, "info");
      } else {
        Swal.fire("Error", data.message || "Something went wrong", "error");
      }
    } catch (error) {
      Swal.fire("Server Error", "Please try again later", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .footer {
          background: #fbf5ef;
          padding: 60px 20px 20px;
          font-family: "Poppins", sans-serif;
          color: #777;
        }

        .footer h6 {
          color: #b08968;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .footer a {
          display: block;
          color: #777;
          text-decoration: none;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .footer a:hover {
          color: #b08968;
        }

        .footer-logo {
          max-width: 160px;
          margin-bottom: 15px;
        }

        /* CONTACT */
        .contact-item {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
          font-size: 14px;
          line-height: 1.5;
        }

        .contact-item svg {
          color: #b08968;
          font-size: 18px;
          margin-top: 3px;
        }

        /* SOCIAL ICONS */
        .icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          cursor: pointer;
        }

        .icon:hover {
          background: #b08968;
          color: #fff;
        }

        /* SUBSCRIBE */
        .footer-sub {
          margin-bottom: -35px;
          color: #b08968;
          font-weight: 600;
          margin-left: -45%;
        }

        .subscribe-box {
          display: flex;
          gap: 10px;
        }

        .subscribe-box input {
          border-radius: 30px;
          padding: 10px 15px;
          border: 1px solid #ddd;
          width: 100%;
        }

        .subscribe-box button {
          border-radius: 30px;
          background: #b08968;
          color: white;
          border: none;
          padding: 10px 25px;
          white-space: nowrap;
        }

        /* FOOTER BOTTOM */
        .footer-bottom {
          border-top: 1px solid #eee;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          font-size: 14px;
        }

        /* PAYMENT ICONS (ORIGINAL COLORS) */
        .payment-icons {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .payment-icons img {
          height: 28px;
          display: block;
        }

        @media (max-width: 768px) {
          .subscribe-box {
            flex-direction: column;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }

        @media (max-width: 320px) {
          .footer-logo {
            max-width: 120px;
          }
        }
      `}</style>


      <footer className="footer">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6">
              <img src="/images/jewelry-4-logo.webp" alt="Logo" className="footer-logo" />
              <div className="contact-item"><LocationOnIcon /> 55 East 10th street, New York</div>
              <div className="contact-item"><CallIcon /> + (220) 123 456 7890</div>
              <div className="contact-item"><EmailIcon /> demo123546@gmail.com</div>
            </div>

            <div className="col-lg-2 col-md-6">
              <h6>Information</h6>
              <a href="/Aboutus">About us</a>
              <a href="/Contact">Contact us</a>
              <a href="/FAQs">Faq’s</a>
              <a href="/Blogs">News</a>
            </div>

            <div className="col-lg-2 col-md-6">
              <h6>Privacy & terms</h6>
              <a href="/Privacy">Privacy policy</a>
              <a href="/refund">Refund policy</a>
              <a href="/shipping">Shipping & return</a>
              <a href="/terms">Terms & condition</a>
            </div>

            <div className="col-lg-2 col-md-6">
              <h6>Category</h6>
              <a href="#">Rings</a>
              <a href="#">Earring</a>
              <a href="#">Pendant</a>
              <a href="#">Necklaces</a>
              <a href="#">Bracelets</a>
            </div>

            <div className="col-lg-3 col-md-6">
              <h6>Visit store</h6>
              <p>Mon - Sat : 10am - 11pm</p>
              <p>Sun : 10am - 4pm</p>
              <p>7 Days a week</p>
            </div>
          </div>

          <div className="row align-items-center mt-5">
            <div className="col-md-6 d-flex mb-3">
              <div className="icon"><FacebookIcon fontSize="small" /></div>
              <div className="icon"><XIcon fontSize="small" /></div>
              <div className="icon"><InstagramIcon fontSize="small" /></div>
              <div className="icon"><PinterestIcon fontSize="small" /></div>
              <div className="icon"><YouTubeIcon fontSize="small" /></div>
            </div>

            <div className="col-md-6">
              <p className="footer-sub">Subscribe and get 15% discount.</p>
              <div className="subscribe-box">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSubscribe} disabled={loading}>
                  {loading ? "PLEASE WAIT..." : "SUBSCRIBE"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-bottom">
        <div>Copyright © 2025 by spacingtech</div>
        <div className="payment-icons">
          <img src="/images/visa-logo-svgrepo-com.svg" alt="Visa" />
          <img src="/images/mastercard-svgrepo-com.svg" alt="Mastercard" />
          <img src="/images/amex.svg" alt="Amex" />
          <img src="/images/pay-pal-paypal-payments-platform.svg" alt="Paypal" />
          <img src="/images/diners-club.svg" alt="Dinersclub" />
          <img src="/images/discover.svg" alt="Discover" />
        </div>
      </div>
    </>
  );
}


