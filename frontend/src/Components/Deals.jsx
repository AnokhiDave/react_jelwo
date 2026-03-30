
import React, { useState } from "react";
import Swal from "sweetalert2";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";

export default function Deal() {
  const [openVideo, setOpenVideo] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .deal-section {
          font-family: "Poppins", sans-serif;
        }

        /* LEFT IMAGE */
        .deal-image {
          position: relative;
          background: url("/images/Deals/jewelry-4-banner-3.webp") center/cover no-repeat;
          min-height: 420px;
          display: flex;
          align-items: center;
        }

        .deal-overlay {
          padding: 60px;
          max-width: 500px;
          margin-left: 45%;
        }

        .deal-overlay h2 {
          font-family: "Playfair Display", serif;
          font-size: 42px;
          margin-bottom: 20px;
          color: #222;
        }

        .deal-overlay p {
          color: #777;
          margin-bottom: 30px;
        }

        .deal-btn {
          background: #b08968;
          color: #fff;
          border: none;
          padding: 12px 36px;
          border-radius: 30px;
          font-size: 14px;
          cursor: pointer;
        }

        /* RIGHT VIDEO */
        .video-box {
          position: relative;
          height: 100%;
          overflow: hidden;
        }

        .video-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .play-btn {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .play-btn span {
          width: 70px;
          height: 70px;
          background: rgba(255,255,255,0.85);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .play-btn svg {
          font-size: 40px;
          color: #b08968;
        }

        /* VIDEO MODAL */
        .video-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .video-modal video {
          width: 80%;
          max-width: 850px;
          border-radius: 10px;
        }

        .close-video {
          position: absolute;
          top: 20px;
          right: 30px;
          color: #fff;
          font-size: 32px;
          cursor: pointer;
        }

        /* -------- RESPONSIVE -------- */
        @media (max-width: 992px) {
          .deal-overlay {
            padding: 40px;
          }

          .deal-overlay h2 {
            font-size: 34px;
          }
        }

        @media (max-width: 576px) {
          .deal-image,
          .video-box {
            margin-bottom: 20px;
          }

          .deal-overlay {
            padding: 30px;
          }

          .deal-overlay h2 {
            font-size: 28px;
          }

          .video-modal video {
            width: 90%;
          }
        }

        @media (max-width: 320px) {
          .deal-overlay h2 {
            font-size: 24px;
          }

          .deal-btn {
            padding: 10px 26px;
            font-size: 13px;
          }

          .play-btn span {
            width: 55px;
            height: 55px;
          }
        }
      `}</style>

      <section className="deal-section">
        <div className="container">
          {/* gx-4 = horizontal gap */}
          <div className="row gx-4 align-items-stretch">

            {/* LEFT (BIGGER) */}
            <div className="col-lg-8">
              <div className="deal-image">
                <div className="deal-overlay">
                  <h2>Unleash your inner shine</h2>
                  <p>
                    It is a long established fact that a reader will be distracted
                    by the readable content of a page when looking at its layout.
                  </p>
                  <button
                    className="deal-btn"
                    onClick={() => navigate("/Products") }
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT (SMALLER) */}
            <div className="col-lg-4">
              <div className="video-box">
                <img
                  src="/images/Deals/jewelry-4-video-banner.webp"
                  alt="Video Banner"
                />
                <div className="play-btn">
                  <span onClick={() => setOpenVideo(true)}>
                    <PlayArrowIcon />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VIDEO POPUP */}
      {openVideo && (
        <div className="video-modal">
          <span className="close-video" onClick={() => setOpenVideo(false)}>
            ×
          </span>
          <video controls autoPlay>
            <source
              src="/images/Deals/747375f4ce1e4946941f966c90baabbb.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      )}
    </>
  );
}
