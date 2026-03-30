import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

export default function Contact() {
  /* ================= FORM STATE (ADDED) ================= */
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    message: "",
    agree: false,
  });

  /* ================= HANDLE CHANGE (ADDED) ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* ================= SUBMIT (ADDED) ================= */
  const handleSubmit = async () => {
    if (!formData.full_name || !formData.email || !formData.message) {
      Swal.fire("Error", "Please fill required fields", "error");
      return;
    }

    if (!formData.agree) {
      Swal.fire("Error", "Please accept terms & conditions", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          mobile: formData.mobile,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success", data.message, "success");

        // ✅ CLEAR FORM
        setFormData({
          full_name: "",
          email: "",
          mobile: "",
          message: "",
          agree: false,
        });
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch {
      Swal.fire("Error", "Server not responding", "error");
    }
  };

  return (
    <>
      {/* ================= CSS (ONE TAG ONLY) ================= */}
      <style>
        {`

        .contact-header {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .contact-header::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }

        .contact-header-content {
          position: relative;
          z-index: 1;
        }

        .breadcrumb-text {
          letter-spacing: 2px;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .contact-header h1 {
          font-family: "Playfair Display", serif;
          font-size: 48px;
        }

        .quick-support {
          background: #fff;
          padding: 60px 0;
        }

        .support-box {
          text-align: center;
        }

        .support-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #f3ede7;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          font-size: 22px;
          color: #a07a55;
        }

        .contact-form-section {
          background: #f8f5f1;
          padding: 60px 0;
        }

        .contact-form input,
        .contact-form textarea {
          border-radius: 0;
          padding: 12px;
        }

        .contact-info {
          background: #fff;
          padding: 40px;
        }

        .social-icons i {
          font-size: 18px;
          margin-right: 12px;
          cursor: pointer;
        }

        .agent-section {
          padding: 0 0 25px; /* extra bottom space */
          position: relative;
          z-index: 1;
        }

        .locations {
          background: #f8f5f1;
          margin-top: -220px; /* pull over image */
        }

        .loc-container {
          position: relative;
          z-index: 2;
          background: #fff;
          padding: 60px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
        }

        .location-box {
          background: #fff;
          padding: 30px 20px;
          text-align: center;
          border: 1px solid #eee;
          height: 100%;
        }

        .location-box img {
          width: 40px;
          margin-bottom: 15px;
        }

        .location-box h6 {
          font-weight: 600;
          margin-bottom: 10px;
        }

        .location-box p {
          font-size: 16px;
          margin-bottom: 6px;
          color: #555;
        }

        .location-box small {
          font-size: 15px;
          color: #777;
        }

        .location-nav {
          font-size: 22px;
          color: #aaa;
          cursor: pointer;
        }

        /* KEEP IN TOUCH */
        .keep-title {
          font-family: "Playfair Display", serif;
          font-size: 40px;
        }

        .keep-box {
          max-width: 1100px;
        }

        .keep-input {
          height: 55px;
          border-radius: 0;
          margin-bottom: 22px;
          font-size: 15px;
        }

        .keep-textarea {
          height: 215px;
          border-radius: 0;
          font-size: 15px;
          resize: none;
        }

        .keep-check {
          font-size: 14px;
          color: #777;
        }

        .keep-check input {
          margin-top: 4px;
        }

        .keep-btn {
          background-color: #b08a6c !important;
          padding: 14px 45px !important;
          border-radius: 30px !important;
          font-size: 14px !important;
          letter-spacing: 1px;
        }

        /* CONTACT INFO IMAGE SECTION */
        .contact-info-section {
          background: #fff;
          padding: 80px 0;
        }

        .contact-info-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .contact-info-content {
          padding-left: 60px;
        }

        .contact-info-content small {
          letter-spacing: 2px;
          color: #b08a6c;
          font-size: 18px;
        }

        .contact-info-content h2 {
          font-family: "Playfair Display", serif;
          font-size: 42px;
          margin: 15px 0 35px;
        }

        .info-item {
          display: flex;
          gap: 18px;
          margin-bottom: 28px;
        }

        .info-item i {
          font-size: 22px;
        }

        .info-item h6 {
          font-size: 14px;
          letter-spacing: 1px;
          margin-bottom: 5px;
        }

        .info-item p {
          margin: 0;
          color: #666;
          font-size: 15px;
        }

        .info-social i {
          font-size: 18px;
          margin-right: 18px;
          cursor: pointer;
        }
        `}
      </style>

      {/* ================= HERO ================= */}
      <section className="contact-header">
        <div className="contact-header-content">
          <div className="breadcrumb-text">HOME - CONTACT</div>
          <h1>Contact</h1>
        </div>
      </section>

      {/* ================= QUICK SUPPORT ================= */}
      <section className="quick-support">
        <div className="container">
          <h3 className="text-center mb-5">Quick support</h3>
          <div className="row">
            <div className="col-md-4 support-box">
              <div className="support-icon">
                <i className="bi bi-geo-alt"></i>
              </div>
              <h6>STORE LOCATION</h6>
              <p>14 Ringe lane, las vegas, nv, 89156 united states</p>
            </div>

            <div className="col-md-4 support-box">
              <div className="support-icon">
                <i className="bi bi-telephone"></i>
              </div>
              <h6>CONTACT CALL</h6>
              <p>+00-1234567890</p>
            </div>

            <div className="col-md-4 support-box">
              <div className="support-icon">
                <i className="bi bi-envelope"></i>
              </div>
              <h6>CONTACT MAIL</h6>
              <p>demo@support.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= AGENT IMAGE ================= */}
      <section className="agent-section text-center">
        <img
          src="../images/Contact/jewelry-contact-us.webp"
          alt="support"
          className="img-fluid"
        />
      </section>

      {/* ================= LOCATIONS ================= */}
    <section className="locations">
        <div className="container loc-container">
            <h3 className="text-center mb-5">Get in touch</h3>

            <div className="row align-items-center">
            
            <div className="col-1 text-center">
                <i className="bi bi-chevron-left location-nav"></i>
            </div>

            <div className="col-10">
                <div className="row g-4">
                
                <div className="col-md-3">
                    <div className="location-box">
                    <img src="../images/Contact/London.avif" alt="UK" />
                    <h6>London</h6>
                    <p>425 Broadway, 20th floor</p>
                    <p>+91 123 456 7890</p>
                    <small>support@store.com</small>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="location-box">
                    <img src="../images/Contact/France.webp" alt="France" />
                    <h6>France</h6>
                    <p>27 Eden walk eden centre</p>
                    <p>+91 123 456 7890</p>
                    <small>support@store.com</small>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="location-box">
                    <img src="../images/Contact/Canada.avif" alt="Canada" />
                    <h6>Canada</h6>
                    <p>523 North stockport road</p>
                    <p>+91 123 456 7890</p>
                    <small>support@store.com</small>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="location-box">
                    <img src="../images/Contact/England.webp" alt="England" />
                    <h6>England</h6>
                    <p>048 Holburn street 20th</p>
                    <p>+91 123 456 7890</p>
                    <small>support@store.com</small>
                    </div>
                </div>

                </div>
            </div>

            <div className="col-1 text-center">
                <i className="bi bi-chevron-right location-nav"></i>
            </div>

            </div>
        </div>
    </section>

      {/* ================= CONTACT FORM (UPDATED ONLY) ================= */}
      <section className="contact-form-section">
        <div className="container">
          <h3 className="text-center mb-5 keep-title">Keep in touch with us</h3>

          <div className="keep-box mx-auto">
            <div className="row g-4 align-items-start">
              <div className="col-md-6">
                <input
                  className="form-control keep-input"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
                <input
                  className="form-control keep-input"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                />
                <input
                  className="form-control keep-input"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Your mobile number"
                />
              </div>

              <div className="col-md-6">
                <textarea
                  className="form-control keep-textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <div className="col-12 mt-3">
                <div className="form-check keep-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    I accept the terms & conditions and I understand that my data
                    will be held securely in accordance with the privacy policy.
                  </label>
                </div>
              </div>

              <div className="col-12 text-center mt-4">
                <Button
                  variant="contained"
                  className="keep-btn"
                  onClick={handleSubmit}
                >
                  SEND MESSAGE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>


    {/* ================= CONTACT INFO IMAGE SECTION ================= */}
    <section className="contact-info-section">
    <div className="container">
        <div className="row align-items-center g-0">

        {/* LEFT IMAGE */}
        <div className="col-md-6 contact-info-img">
            <img
            src="../images/Contact/jewelry-contact-us-3.webp"
            alt="contact"
            />
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-md-6">
            <div className="contact-info-content">
            <small>WE'D LOVE TO HEAR FROM YOU</small>
            <h2>Contact us</h2>

            <div className="info-item">
                <i className="bi bi-geo-alt"></i>
                <div>
                <h6>ADDRESS</h6>
                <p>
                    70 Washington square south new york, NY 10012,<br />
                    united states
                </p>
                </div>
            </div>

            <div className="info-item">
                <i className="bi bi-telephone"></i>
                <div>
                <h6>PHONE</h6>
                <p>+1 234 567 8910</p>
                </div>
            </div>

            <div className="info-item">
                <i className="bi bi-envelope"></i>
                <div>
                <h6>EMAIL</h6>
                <p>info@yourdomain.com</p>
                </div>
            </div>

            <div className="info-social mt-4">
                <i className="bi bi-facebook"></i>
                <i className="bi bi-twitter-x"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-pinterest"></i>
                <i className="bi bi-youtube"></i>
            </div>
            </div>
        </div>

        </div>
    </div>
    </section>

    </>
  );
}


