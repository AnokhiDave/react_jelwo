import React, { useState, useEffect } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import DiamondIcon from "@mui/icons-material/Diamond";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReplayIcon from "@mui/icons-material/Replay";
import SecurityIcon from "@mui/icons-material/Security";
import axios from "axios";

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [team, setTeam] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    testimonial_name: "",
    testimonial_message: "",
    testimonial_image: ""
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials]);

  // Fetch testimonials
  useEffect(() => {
    axios.get("http://localhost:5000/api/testimonials")
      .then(res => setTestimonials(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch team members
  useEffect(() => {
    axios.get("http://localhost:5000/api/teams")
      .then(res => setTeam(res.data))
      .catch(err => console.error(err));
  }, []);

  // POST new testimonial
  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/testimonials", newTestimonial);
      setTestimonials([...testimonials, { ...newTestimonial, testimonial_id: res.data.id }]);
      setNewTestimonial({ testimonial_name: "", testimonial_message: "", testimonial_image: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* ================== CSS (ONE TAG ONLY) ================== */}
      <style>
        {`
        .about-header {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .about-header::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }

        .about-header-content {
          position: relative;
          z-index: 1;
        }

        .breadcrumb-text {
          letter-spacing: 2px;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .about-header h1 {
          font-family: "Playfair Display", serif;
          font-size: 48px;
        }

        .section-title small {
          letter-spacing: 2px;
          color: #b28b5e;
          font-size: 16px;
          font-weight: 500;
        }

        .section-title h2 {
          font-size: 36px;
          font-weight: 500;
        }

        .img-fluid {
          width: 100%;
        }

        .stats h5 {
          font-size: 16px;
          letter-spacing: 1px;
        }

        /* ===== TESTIMONIAL STYLE ===== */
        .testimonial-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 24px;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .testimonial-arrow.left {
          left: 15px;
        }

        .testimonial-arrow.right {
          right: 15px;
        }

        .testimonial {
          background: #f6f1ed;
          padding: 0px 20px 285px;
          text-align: center;
          position: relative;
        }

        .testimonial img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-top: -30px;
          border: 4px solid #fff;
        }

        .testimonial small {
          letter-spacing: 2px;
          font-size: 12px;
          display: block;
          margin-top: 15px;
          color: #777;
        }

        .testimonial p {
          max-width: 720px;
          margin: 20px auto;
          font-size: 18px;
          color: #666;
        }

        .testimonial strong {
          font-size: 14px;
          letter-spacing: 1px;
        }

        /* arrows */
        .testimonial-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .testimonial-arrow.left {
          left: 30px;
          top: 30%;
        }

        .testimonial-arrow.right {
          right: 30px;
          top: 30%;
        }

        /* ===== WORK SECTION ===== */
        .work{
          position: relative;
          z-index: 1;
          margin-top: -15%;
          margin-bottom: 50px;
        }

        .work-image img {
          width: 100%;
          display: block;
        }

        .work-text {
          width: 100%;
          justify-content: space-evenly;
        }

        .work-text h6 {
          font-size: 14px;
          font-weight: 600;
        }

        .work-text p {
          font-size: 14px;
          color: #666;
        }


        .team img {
          width: 100%;
          border-radius: 6px;
        }

        .team h6 {
          margin-top: 15px;
          margin-bottom: 0;
          font-weight: 600;
          font-size: 18px;
        }

        .features {
          background: #fff;
          padding: 60px 0;
        }

        .feature-icon {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: #f4f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          color: #b28b5e;
        }
        `}
      </style>

      <section className="about-header">
        <div className="about-header-content">
          <div className="breadcrumb-text">HOME - ABOUT US</div>
          <h1>About Us</h1>
        </div>
      </section>

      {/* ================== STORY ================== */}
      <div className="container py-5">
        <div className="text-center section-title mb-4">
          <small>SINCE 1982 OUR STORY</small>
          <h2>Our about story</h2>
        </div>

        <img
          src="../images/About/about-us-1.webp"
          alt="story"
          className="img-fluid mb-4"
        />

        <div className="row text-center stats">
          <div className="col-md-4 ">
            <h5>5,000+ HAPPY CUSTOMER</h5>
            <p>The customer's perception is your reality. Your most unhappy customers are your greatest source of learning</p>
          </div>
          <div className="col-md-4">
            <h5>40 YEARS OF EXPERIENCES</h5>
            <p>Awards can give you a tremendous amount of encouragement to keep getting better, no matter how young or old you are.</p>
          </div>
          <div className="col-md-4">
            <h5>40 YEARS OF EXPERIENCES</h5>
            <p>Lorem Ipsum is simply dummy text printing.</p>
          </div>
        </div>
      </div>

      {/* ================== TESTIMONIAL SLIDER ================== */}
      <div className="testimonial position-relative">
        {testimonials.length > 0 ? (
          <>
            <div className="testimonial-item text-center mb-5">
              <img
                src={`http://localhost:5000/images/Testimonials/${testimonials[currentIndex].testimonial_image}`}
                alt={testimonials[currentIndex].testimonial_name}
                className="rounded-circle"
              />
              <small>WE LOVE OUR CLIENTS</small>
              <p>{testimonials[currentIndex].testimonial_review}</p>
              <strong>{testimonials[currentIndex].testimonial_name}</strong>
            </div>

            {/* Arrows */}
            <div
              className="testimonial-arrow left"
              onClick={() =>
                setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
              }
            >
              &#10094;
            </div>
            <div
              className="testimonial-arrow right"
              onClick={() =>
                setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
              }
            >
              &#10095;
            </div>
          </>
        ) : (
          <p>Loading testimonials...</p>
        )}
      </div>

      {/* ================== WORK ================== */}
      <div className="container">
        <div className="col align-items-center">
          <div className="col">
            <img
              src="../images/About/about-us-2.webp"
              alt="work"
              className="img-fluid work"
            />
          </div>
          <div className="row text-center stats work-text">
            <div className="col-md-6">
              <h5>Fashion is what you’re offered four times a yea by designers fashions fade</h5>
              <p>In early 1982, founder and creative direct or had the idea to design a bag collection where comfort, fashion, and distinction are key.</p>
            </div>
            <div className="col-md-6">
              <h5>I prefer to shock rather than to bore through repetition style is eternal</h5>
              <p>I have always believed that fashion was not only to make women more beautiful, but also to reassure them, give them confidence.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================== TEAM ================== */}
      <div className="container py-5 team">
        <div className="text-center section-title mb-5">
          <small>HIGHLY SKILLED</small>
          <h2>Meet our teams</h2>
        </div>

        <div className="row text-center">
          {team.length > 0 ? (
            team.map((member, i) => (
              <div className="col-md-3" key={member.team_id}>
                <img
                  src={`http://localhost:5000/${member.team_image}`}// make sure the URL is correct
                  alt={member.team_name}
                />
                <h6>{member.team_name}</h6>
                <small>{member.team_role}</small>
              </div>
            ))
          ) : (
            <p>Loading team members...</p>
          )}
        </div>
      </div>

      {/* ================== FEATURES ================== */}
      <div className="features">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <div className="feature-icon">
                <LocalShippingIcon />
              </div>
              <h6>FAST SHIPPING</h6>
              <p>Free Shipping starts now! No minimums.</p>
            </div>
            <div className="col-md-4">
              <div className="feature-icon">
                <ReplayIcon />
              </div>
              <h6>EASY RETURNS</h6>
              <p>Do everything with a good heart.</p>
            </div>
            <div className="col-md-4">
              <div className="feature-icon">
                <SecurityIcon />
              </div>
              <h6>100% MONEY SECURE</h6>
              <p>100% money back guarantee.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
