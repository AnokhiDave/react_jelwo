import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

export default function News() {
  const [blogs, setBlogs] = useState([]);

  /* FETCH BLOGS */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blog")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("API ERROR:", err));
  }, []);

  const Card = ({ blog }) => (
    <div className="news-card">
      <div className="news-img">
        <img
          src={`http://localhost:5000/images/News/${blog.blog_image}`}
          alt="Blog"
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

        <Link to={`/blogdetails/${blog.blog_id}`}>
          <Button className="read-btn">READ MORE</Button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* ================= CSS ================= */}
       <style>{`
        /* Header */
        .news-header {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .news-header::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }

        .news-header-content {
          position: relative;
          z-index: 1;
        }

        .breadcrumb-text {
          letter-spacing: 2px;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .news-header h1 {
          font-family: "Playfair Display", serif;
          font-size: 48px;
        }

        /* Section */
        .news-section {
          padding: 80px 50px;
          background: #fff;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .news-card {
          background: #fff;
        }

        .news-img {
          position: relative;
          overflow: hidden;
        }

        .news-img img {
          width: 100%;
          height: 320px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .news-body {
          padding: 30px 20px;
          text-align: center;
        }

        .news-meta {
          font-size: 23px;
          letter-spacing: 1px;
          color: #b28b6d;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .divider {
          margin: 0 10px;
        }

        .news-text {
          font-size: 16px;
          line-height: 1.7;
          color: #777;
          margin-bottom: 25px;
          font-weight: 500;
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

        /* Hover Overlay */
        .hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
          outline: none;      /* removes the focus outline */
          text-decoration: none;  /* removes the underline */
        }

        .hover-overlay a {
          outline: none;      /* ensures no outline on focus/click */
          text-decoration: none;
        }

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
        }

        .news-card:hover img {
          transform: scale(1.08);
        }

        .news-card:hover .hover-overlay {
          opacity: 1;
        }

        .news-card:hover .arrow-circle {
          transform: scale(1);
        }

        /* Responsive */
        @media (max-width: 992px) {
          .news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .news-grid {
            grid-template-columns: 1fr;
          }

          .news-header h1 {
            font-size: 36px;
          }
        }
      `}</style>

      {/* HEADER */}
      <section className="news-header">
        <div className="news-header-content">
          <div className="breadcrumb-text">HOME - NEWS</div>
          <h1>News</h1>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="news-section">
        <div className="news-grid">
          {blogs.map((blog) => (
            <Card key={blog.blog_id} blog={blog} />
          ))}
        </div>
      </section>
    </>
  );
}
