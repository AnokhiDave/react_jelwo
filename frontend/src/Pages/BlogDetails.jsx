import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Divider } from "@mui/material";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blog/recent")
      .then((res) => setRecentPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/comments/${id}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center my-5">Blog not found</div>;
  }

    // ================= COMMENT HANDLERS =================

  const handleChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  };
  const handleNewsletterSubmit = async () => {
    if (!newsletterEmail) {
      alert("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(newsletterEmail)) {
      alert("Enter valid email address");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/subscribe",
        { email: newsletterEmail }
      );

      alert(res.data.message || "Subscribed successfully!");
      setNewsletterEmail("");
    } catch (error) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Email already subscribed");
      }
    }
  };

  const handleSubmit = async () => {
    if (!commentData.name || !commentData.email || !commentData.message) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/comments", {
        blog_id: id,
        ...commentData,
      });

      // Clear form
      setCommentData({ name: "", email: "", message: "" });

      // Reload comments
      const res = await axios.get(
        `http://localhost:5000/api/comments/${id}`
      );
      setComments(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to add comment");
    }
  };

  return (
    <>
      {/* ================= CSS (ONE TAG ONLY) ================= */}
      <style>
        {`
        .details-header {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .details-header::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }

        .details-header-content {
          position: relative;
          z-index: 1;
        }

        .breadcrumb-text {
          letter-spacing: 2px;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .details-header h1 {
          font-family: "Playfair Display", serif;
          font-size: 48px;
        }

        .sidebar {
          position: sticky;
          top: 10px; /* adjust based on navbar height */
        }


        .sidebar-box {
          background: #fff;
          margin-bottom: 25px;
          border-radius: 6px;
        }

        .sidebar-box h6 {
          font-weight: 600;
          margin-bottom: 15px;
        }

        .recent-post {
          display: flex;
          gap: 10px;
          margin-bottom: 12px;
        }

        .recent-post img {
          width: 100px;
          height: 70px;
          object-fit: cover;
          border-radius: 4px;
        }

        .tags span {
          display: inline-block;
          background: #eee;
          padding: 6px 12px;
          font-size: 13px;
          margin: 5px;
        }

        .blog-title {
          font-size: 32px;
          font-weight: 600;
          margin-top: 20px;
        }

        .blog-meta {
          color: #888;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .blog-content p {
          color: #555;
          line-height: 1.8;
        }

        .quote-box {
          background: #f3ede7;
          padding: 25px;
          font-style: italic;
          border-left: 4px solid #c4a484;
          margin: 30px 0;
        }

        .blog-images img {
          width: 100%;
          border-radius: 6px;
        }

        .comment-box {
          background: #fff;
          padding: 20px;
          border-radius: 6px;
          margin-bottom: 15px;
        }

        .comment-avatar {
          width: 45px;
          height: 45px;
          background: #c4a484;
          color: #fff;
          font-weight: bold;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .comment-form input,
        .comment-form textarea {
          border-radius: 4px;
        }

        .post-btn {
          background: #c4a484 !important;
          color: #fff !important;
          padding: 10px 28px !important;
          border-radius: 25px !important;
        }

        .img-fluid{
          width: 100%;
        }

        .newsletter-input {
            border: none;
            border-bottom: 1px solid #ddd;
            border-radius: 0;
            padding-right: 35px;
        }

        .newsletter-box {
            position: relative;
        }

        .newsletter-icon {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18px;
            color: #333;
        }

        .instagram-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 10px;
        }

        .instagram-grid img {
            width: 100%;
            height: 85px;
            object-fit: cover;
            border-radius: 4px;
            cursor: pointer;
        }

        `}
      </style>

      {/* ================= HEADER ================= */}
      <section className="details-header">
        <div className="details-header-content">
          <div className="breadcrumb-text">NEWS</div>
          <h1>{blog.blog_title}</h1>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="container my-5">
        <div className="row">

          {/* ========== SIDEBAR ========== */}
          <div className="col-lg-3 ">
            <div className="sidebar">
            <div className="sidebar-box">
              <h6>Search</h6>
              <input className="form-control" placeholder="Search..." />
            </div>

            {/* <div className="sidebar-box">
              <h6>Recent Posts</h6>

              <div className="recent-post">
                <img src="../images/News/jewelry-blog-1.webp" alt="" />
                <div>
                  <small>Mar 10, 2025</small>
                  <p className="mb-0">Jewels as unique as your journey</p>
                </div>
              </div>

              <div className="recent-post">
                <img src="../images/News/jewelry-blog-2.webp" alt="" />
                <div>
                  <small>Mar 02, 2025</small>
                  <p className="mb-0">Crafted for moments that matter</p>
                </div>
              </div>

              <div className="recent-post">
                <img src="../images/News/jewelry-blog-3.webp" alt="" />
                <div>
                  <small>Mar 02, 2025</small>
                  <p className="mb-0">Timeless treasures moments</p>
                </div>
              </div>
            </div> */}

            <div className="sidebar-box">
              <h6>Recent Posts</h6>

              {recentPosts.map((post) => (
                <div
                  className="recent-post"
                  key={post.blog_id}
                  style={{ cursor: "pointer" }}
                  onClick={() => window.location.href = `/blogdetails/${post.blog_id}`}
                >
                  <img
                    src={`http://localhost:5000/images/News/${post.blog_image}`}
                    alt=""
                  />
                  <div>
                    <small>
                      {new Date(post.blog_date).toLocaleDateString()}
                    </small>
                    <p className="mb-0">{post.blog_title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="sidebar-box tags">
              {blog.blog_tags.split(",").map((tag, i) => (
                <span key={i}>{tag.trim()}</span>
              ))}
            </div>

            {/* ===== Newsletter ===== */}
            <div className="sidebar-box">
              <h6>Newsletter</h6>

              <div className="newsletter-box">
                <input
                  type="email"
                  className="form-control newsletter-input"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />

                <i
                  className="bi bi-envelope newsletter-icon"
                  style={{ cursor: "pointer" }}
                  onClick={handleNewsletterSubmit}
                ></i>
              </div>
            </div>

            {/* ===== Instagram ===== */}
            <div className="sidebar-box">
                <h6>Instagram</h6>
                <div className="instagram-grid">
                    <img src="../images/News/jewelry-1-insta-1.avif" alt="" />
                    <img src="../images/News/jewelry-1-insta-2.avif" alt="" />
                    <img src="../images/News/jewelry-1-insta-3.avif" alt="" />
                    <img src="../images/News/jewelry-1-insta-4.avif" alt="" />
                    <img src="../images/News/jewelry-1-insta-5.avif" alt="" />
                    <img src="../images/News/jewelry-1-insta-6.avif" alt="" />
                </div>
            </div>
            </div>

          </div>

          {/* ========== BLOG CONTENT ========== */}
          <div className="col-lg-9">

            {/* MAIN IMAGE */}
            <img
              src={`http://localhost:5000/images/News/${blog.blog_image}`}
              className="img-fluid rounded"
              alt=""
            />

            {/* TITLE */}
            <h2 className="blog-title">{blog.blog_title}</h2>

            {/* META */}
            <div className="blog-meta">
              {blog.blog_date} &nbsp; | &nbsp; By {blog.blog_author}
            </div>

            {/* DESCRIPTION */}
            <div className="blog-content">
              <p>{blog.blog_description}</p>

              {/* SUB IMAGES */}
              <div className="row blog-images my-4">
                <div className="col-md-6">
                  <img src={`http://localhost:5000/images/News/${blog.blog_subimage1}`} alt="" />
                </div>
                <div className="col-md-6">
                  <img src={`http://localhost:5000/images/News/${blog.blog_subimage2}`} alt="" />
                </div>
              </div>

              {/* QUOTE */}
              <div className="quote-box">
                “{blog.blog_submessage}”
              </div>

              <p>{blog.blog_subdescription}</p>
            </div>

            {/* TAGS */}
            <div className="sidebar-box tags">
              {blog.blog_tags.split(",").map((tag, i) => (
                <span key={i}>{tag.trim()}</span>
              ))}
            </div>

            <Divider className="my-4" />

            <h5 className="mt-4">Comments ({comments.length})</h5>

            {comments.length === 0 && <p>No comments yet.</p>}

            {comments.map((comment) => (
              <div className="comment-box d-flex gap-3" key={comment.comment_id}>
                <div className="comment-avatar">
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <strong>{comment.name}</strong>
                  <p className="mb-1">{comment.message}</p>
                  <small className="text-muted">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))}
            

            {/* COMMENT FORM (UI ONLY) */}
            <h5 className="mt-4">Leave a comment</h5>
            <div className="comment-form">
              <input
                className="form-control mb-3"
                placeholder="Name*"
                name="name"
                value={commentData.name}
                onChange={handleChange}
              />

              <input
                className="form-control mb-3"
                placeholder="Email*"
                name="email"
                value={commentData.email}
                onChange={handleChange}
              />

              <textarea
                className="form-control mb-3"
                rows="4"
                placeholder="Message"
                name="message"
                value={commentData.message}
                onChange={handleChange}
              />

              <Button className="post-btn" onClick={handleSubmit}>
                POST COMMENT
              </Button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
} 