import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function News() {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blog")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("API ERROR:", err));
  }, []);

  // Card component for each blog
  const Card = ({ blog }) => (
    <div className="news-card">
      <div className="news-img">
        <img
          src={`http://localhost:5000/images/News/${blog.blog_image}`}
          alt={blog.blog_title || "Blog"}
        />
        <div className="hover-overlay">
          <Link to={`/blogdetails/${blog.blog_id}`}>
            <span className="arrow-circle">→</span>
          </Link>
        </div>
      </div>

      <div className="news-body">
        <div className="news-meta">
          <span>{blog.blog_date}</span>
          <span className="divider">|</span>
          <span>By {blog.blog_author}</span>
        </div>

        <p className="news-text">
          {blog.blog_description.substring(0, 120)}...
        </p>

        <Button
          className="read-btn"
          component={Link}
          to={`/blogdetails/${blog.blog_id}`}
        >
          READ MORE
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* ================= CSS ================= */}
      <style>{`
        .news-section {
          margin: 0 50px 0;
          text-align: center;
          background: #fff;
        }

        .news-section h2 {
          font-family: "Playfair Display", serif;
          font-size: 42px;
          margin-top: 5%;
          margin-bottom: 60px;
        }

        .news-card {
          background: #fff;
        }

        .news-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .news-img {
          position: relative;
          overflow: hidden;
        }

        .news-img img {
          transition: transform 0.6s ease;
        }

        .news-body {
          padding: 30px 20px;
        }

        .news-meta {
          font-size: 23px;
          letter-spacing: 1px;
          color: #b28b6d;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .news-meta .divider {
          margin: 0 10px;
        }

        .news-text {
          font-size: 16px;
          line-height: 1.7;
          color: #777;
          margin-bottom: 25px;
          font-weight: 600;
        }

        .read-btn {
          background: #b28b6d !important;
          color: #fff !important;
          padding: 10px 28px !important;
          border-radius: 30px !important;
          font-size: 14px !important;
          letter-spacing: 1px;
        }

        .read-btn:hover {
          background: #9e7457 !important;
        }

        /* Overlay */
        .hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        /* Remove focus outline on link */
        .hover-overlay a {
          outline: none;
          text-decoration: none;
        }

        .hover-overlay a:focus,
        .hover-overlay a:active {
          outline: none;
        }

        /* Arrow Button */
        .arrow-circle {
          width: 60px;
          height: 60px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: #b28b6d;
          transform: scale(0.7);
          transition: transform 0.4s ease;
          cursor: pointer;
        }

        /* Hover Effects */
        .news-card:hover .hover-overlay {
          opacity: 1;
        }

        .news-card:hover img {
          transform: scale(1.08);
        }

        .news-card:hover .arrow-circle {
          transform: scale(1);
        }

        @media (max-width: 768px) {
          .news-card img {
            height: 300px;
          }
        }
      `}</style>

      {/* ================= SECTION ================= */}
      <section className="news-section">
        <h2>Jewelry News</h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog.blog_id}>
              <Card blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
