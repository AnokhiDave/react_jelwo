import React from "react";
import Swal from "sweetalert2";

// MUI Icons
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export default function Location() {

  const openMap = (place) => {
    Swal.fire({
      icon: "info",
      title: place,
      text: "Opening Google Maps location…",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <>
      {/* ================= STYLES ================= */}
      <style>{`
        .location-hero {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .location-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
        }

        .location-hero-content {
          position: relative;
          z-index: 2;
          padding: 0 15px;
        }

        .location-hero h1 {
          font-size: 44px;
          font-weight: 600;
        }

        .location-hero p {
          font-size: 13px;
          letter-spacing: 1px;
          opacity: 0.9;
        }

        .location-section {
          padding: 80px 0;
          font-family: "Poppins", sans-serif;
        }

        .store-row {
          align-items: center;
          margin-bottom: 50px;
        }

        .store-img img {
          width: 100%;
        }

        /* ===== PERFECT TEXT STYLE ===== */
        .store-title {
          font-family: "Playfair Display", serif;
          font-size: 40px;
          font-weight: 500;
          margin-bottom: 30px;
        }

        .store-line {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 22px;
        }

        .store-line svg {
          font-size: 30px;
          font-weight: 300;
          margin-top: 3px;
          color: #000;
        }

        .store-label {
          display: block;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 1px;
          color: #000;
          margin-bottom: 4px;
        }

        .store-text {
          font-size: 16px;
          color: #777;
          line-height: 1.6;
          margin: 0;
        }

        .map-btn {
          margin-top: 18px;
          font-size: 13px;
          font-weight: 600;
          color: #b08968;
          cursor: pointer;
          display: inline-block;
        }

        /* Container width */
        @media (min-width: 1200px) {
          .container {
            max-width: 1300px;
          }
        }

        /* Tablet */
        @media (max-width: 768px) {
          .location-hero h1 {
            font-size: 32px;
          }

          .store-row {
            margin-bottom: 60px;
          }
        }

        /* Mobile */
        @media (max-width: 576px) {
          .location-section {
            padding: 50px 0;
          }

          .location-hero {
            height: 120px;
          }

          .location-hero h1 {
            font-size: 26px;
          }

          .store-title {
            font-size: 24px;
          }
        }

        /* Small Mobile ≤320px */
        @media (max-width: 320px) {
          .location-hero {
            height: 105px;
          }

          .location-hero h1 {
            font-size: 22px;
          }

          .location-hero p {
            font-size: 11px;
          }

          .store-title {
            font-size: 22px;
          }

          .store-text {
            font-size: 13px;
          }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <section className="location-hero">
        <div className="container">
          <div className="location-hero-content">
            <p>HOME › STORE LOCATION</p>
            <h1>Store Location</h1>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="location-section">
        <div className="container">

          {/* ===== STORE 1 ===== */}
          <div className="row store-row">
            <div className="col-lg-6">
              <div className="store-img">
                <img src="/images/Location/Valsone-shop.webp" alt="Valsone shop" />
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="store-title">Valsone shop</h2>

              <div className="store-line">
                <PhoneOutlinedIcon />
                <div>
                  <span className="store-label">LET'S TALK</span>
                  <p className="store-text">+999 3222 000 388</p>
                </div>
              </div>

              <div className="store-line">
                <EmailOutlinedIcon />
                <div>
                  <span className="store-label">SAY HI!</span>
                  <p className="store-text">store@domain.com</p>
                </div>
              </div>

              <div className="store-line">
                <LocationOnOutlinedIcon />
                <div>
                  <span className="store-label">STORE ADDRESS</span>
                  <p className="store-text">
                    27 Eden walk eden centre, Broadway, United States
                  </p>
                </div>
              </div>

              <div className="store-line">
                <AccessTimeOutlinedIcon />
                <div>
                  <span className="store-label">OPENING HOURS</span>
                  <p className="store-text">Mon - Fri : 9:00am - 6:00pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== STORE 2 ===== */}
          <div className="row store-row flex-row-reverse">
            <div className="col-lg-6">
              <div className="store-img">
                <img src="/images/Location/Melbourne-place.webp" alt="Melbourne place" />
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="store-title">Melbourne place</h2>

              <div className="store-line">
                <PhoneOutlinedIcon />
                <div>
                  <span className="store-label">LET'S TALK</span>
                  <p className="store-text">+61 9988 7766</p>
                </div>
              </div>

              <div className="store-line">
                <EmailOutlinedIcon />
                <div>
                  <span className="store-label">SAY HI!</span>
                  <p className="store-text">melbourne@domain.com</p>
                </div>
              </div>

              <div className="store-line">
                <LocationOnOutlinedIcon />
                <div>
                  <span className="store-label">STORE ADDRESS</span>
                  <p className="store-text">
                    22 Queen Street, Melbourne, Australia
                  </p>
                </div>
              </div>

              <div className="store-line">
                <AccessTimeOutlinedIcon />
                <div>
                  <span className="store-label">OPENING HOURS</span>
                  <p className="store-text">Mon - Sat : 10:00am - 7:00pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== STORE 3 ===== */}
          <div className="row store-row">
            <div className="col-lg-6">
              <div className="store-img">
                <img src="/images/Location/Ansolt-park.webp" alt="Ansol park" />
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="store-title">Ansol park</h2>

              <div className="store-line">
                <PhoneOutlinedIcon />
                <div>
                  <span className="store-label">LET'S TALK</span>
                  <p className="store-text">+44 7722 889900</p>
                </div>
              </div>

              <div className="store-line">
                <EmailOutlinedIcon />
                <div>
                  <span className="store-label">SAY HI!</span>
                  <p className="store-text">ansol@domain.com</p>
                </div>
              </div>

              <div className="store-line">
                <LocationOnOutlinedIcon />
                <div>
                  <span className="store-label">STORE ADDRESS</span>
                  <p className="store-text">
                    15 Baker Street, London, United Kingdom
                  </p>
                </div>
              </div>

              <div className="store-line">
                <AccessTimeOutlinedIcon />
                <div>
                  <span className="store-label">OPENING HOURS</span>
                  <p className="store-text">Mon - Fri : 9:30am - 5:30pm</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
