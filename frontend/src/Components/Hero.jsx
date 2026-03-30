import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Hero() {
  const slides = [
    {
      bg: "/images/Hero/jewelry-4-slider-1.webp",
      title: "Jewelry is our\npassion",
    },
    {
      bg: "/images/Hero/jewelry-4-slider-2.webp",
      title: "Jewelery made\nwith love",
    },
    {
      bg: "/images/Hero/jewelry-4-slider-3.webp",
      title: "Elegance is our\nobsession",
    },
  ];

  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex(index === 0 ? slides.length - 1 : index - 1);
  };

  const nextSlide = () => {
    setIndex(index === slides.length - 1 ? 0 : index + 1);
  };

  return (
    <>
      <style>{`
        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: "Playfair Display", serif;
          background-size: cover;
          background-position: center;
          transition: background-image 0.6s ease-in-out;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 700px;
          padding: 20px;
        }

        .hero-j {
          width: 100px;
          margin-bottom: 20px;
        }

        .hero-title {
          font-size: 70px;
          line-height: 1.1;
          color: #222;
          white-space: pre-line;
          margin-top: 30px;
        }

        .hero-btn {
          margin-top: 30px;
          padding: 12px 36px;
          border-radius: 30px;
          background: #b08968;
          color: white;
          border: none;
          font-size: 14px;
          letter-spacing: 1px;
          cursor: pointer;
        }

        .hero-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #fff;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #b08968;
          z-index: 3;
        }

        .hero-arrow.left {
          left: 30px;
        }

        .hero-arrow.right {
          right: 30px;
        }

        /* ===== PROMO STRIP ===== */
        .hero-promo-wrap {
          background: #fff;
          padding: 25px 15px;
          display: flex;
          justify-content: center;
        }

        .hero-promo {
          background: #fbf5ef;
          border-radius: 50px;
          padding: 12px 70px;
          font-family: "Poppins", sans-serif;
          font-size: 14px;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: center;
        }

        .promo-badge {
            background: #b08968;
            color: #fff;
            padding: 4px 12px;
            border-radius: 20px;
            font-weight: 600;
            animation: blinkBadge 1.5s infinite ease-in-out;
        }
        @keyframes blinkBadge {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0.4;
            }
            100% {
                opacity: 1;
            }
        }

        /* -------- TABLET -------- */
        @media (max-width: 992px) {
          .hero-title {
            font-size: 48px;
          }

          .hero-j {
            width: 80px;
          }
        }

        /* -------- MOBILE -------- */
        @media (max-width: 576px) {
          .hero {
            min-height: 80vh;
          }

          .hero-title {
            font-size: 36px;
            margin-top: 20px;
          }

          .hero-j {
            width: 65px;
          }

          .hero-btn {
            padding: 10px 28px;
            font-size: 13px;
          }

          .hero-arrow {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }

          .hero-arrow.left {
            left: 15px;
          }

          .hero-arrow.right {
            right: 15px;
          }

          .hero-promo {
            font-size: 13px;
            padding: 10px 18px;
            border-radius: 30px;
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        /* -------- SMALL MOBILE (≤320px) -------- */
        @media (max-width: 320px) {
          .hero-title {
            font-size: 30px;
          }

          .hero-j {
            width: 55px;
          }

          .hero-btn {
            padding: 8px 22px;
            font-size: 12px;
          }

          .hero-promo {
            font-size: 12px;
          }
        }
      `}</style>

      {/* ===== HERO SLIDER ===== */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${slides[index].bg})` }}
      >
        <button className="hero-arrow left" onClick={prevSlide}>
          ←
        </button>

        <div className="hero-content">
          <img
            src="/images/Hero/jewelry-4-slider-label.webp"
            alt="J Logo"
            className="hero-j"
          />
          <h1 className="hero-title">{slides[index].title}</h1>
          <Button
            className="hero-btn"
            component={Link}
            to={`/Products`}
          >
            SHOP NOW
          </Button>
        </div>

        <button className="hero-arrow right" onClick={nextSlide}>
          →
        </button>
      </section>

      {/* ===== PROMO STRIP ===== */}
      <div className="hero-promo-wrap">
        <div className="hero-promo">
          <span>DIAMONDS FOR EVERY EXCUSE 1500+ DESIGNS UNDER</span>
          <span className="promo-badge">$200</span>
        </div>
      </div>
    </>
  );
}