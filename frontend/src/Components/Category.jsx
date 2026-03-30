import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleShopNow = (category) => {
    Swal.fire({
      title: category,
      text: "Explore premium collections ✨",
      icon: "success",
      confirmButtonText: "Continue",
    });
  };

  const categoryImages = {
    ring: "jewelry-4-cate-1.webp",
    earring: "jewelry-4-cate-2.webp",
    bracelet: "jewelry-4-cate-3.webp",
    necklace: "jewelry-4-cate-4.webp",
    pendant: "jewelry-4-cate-5.webp",
    nosepin: "jewelry-4-cate-61.jpeg",
  };

  const Card = ({ img, title }) => (
    <div className="category-card">
      <img
        src={`/images/Category/${img}`}
        alt={title}
      />
      <div className="category-content">
        <span>Explore Collection</span>
        <h3>{title}</h3>
        <Button
          className="shop-btn"
          onClick={() => handleShopNow(title)}
          component={Link}
          to={`/Products`}
        >
          SHOP NOW
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* ===================== CSS ===================== */}
      <style>{`
        .popular-category {
          margin: 0 50px 0;
          text-align: center;
          background: #fff;
        }

        .popular-category h2 {
          font-family: "Playfair Display", serif;
          font-size: 42px;
          margin-bottom: 50px;
        }

        .category-card {
          position: relative;
          overflow: hidden;
        }

        .category-card img {
          width: 100%;
          height: 480px;
          object-fit: cover;
        }

        .category-content {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          padding: 30px 15px;
          width: 80%;
          text-align: center;
        }

        .category-content span {
          font-size: 16px;
          font-weight: 500;
          color: #808080;
          letter-spacing: 1px;
        }

        .category-content h3 {
          font-family: "Playfair Display", serif;
          font-size: 40px;
          font-weight: 500;
          margin: 10px 0;
        }

        .shop-btn {
          font-size: 16px !important;
          letter-spacing: 1px;
          color: #808080 !important;
          border-bottom: 1px solid #808080 !important;
          border-radius: 0 !important;
          padding: 0 !important;
        }

        .feature-bar {
          border: 1px solid #eee;
          padding: 15px 0;
          margin: 50px;
          background: #fff;
        }

        .featureline{
          border-right-width: 1px;
          border-right-style: solid;
          border-right-color: rgba(34, 34, 34, 0.1);
          padding-right: 9px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .feature-item i {
          font-size: 36px;
          color: #b08a6f;
        }

        .feature-item h5 {
          margin: 0;
          font-size: 18px;
          font-weight: 500;
        }

        .feature-item p {
          margin: 0;
          font-size: 14px;    
          color: #808080;
          font-weight: 600;
        }


        @media (max-width: 768px) {
          .category-card img {
            height: 360px;
          }
        }

        @media (max-width: 576px) {
          .category-card img {
            height: 300px;
          }
        }
      `}</style>

      {/* ===================== SECTION ===================== */}
      <section className="popular-category">
        <h2>Popular Category</h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index}>
              <Card
                img={
                  categoryImages[
                    cat.toLowerCase().replace(/\s+/g, "")
                  ] || "default.webp"
                }
                title={cat}
              />
            </SwiperSlide>
          ))}

        </Swiper>
      </section>

      <div className="feature-bar">
        <div className="container">
            <div className="row text-start ">
            <div className="col-md-3 col-12 mb-3 mb-md-0">
                <div className="feature-item featureline">
                <i className="bi bi-truck"></i>
                <div>
                    <h5>Free shipping</h5>
                    <p>Free shipping all order</p>
                </div>
                </div>
            </div>

            <div className="col-md-3 col-12 mb-3 mb-md-0">
                <div className="feature-item featureline">
                <i className="bi bi-headset"></i>
                <div>
                    <h5>Quality support</h5>
                    <p>Contact us anytime</p>
                </div>
                </div>
            </div>

            <div className="col-md-3 col-12 mb-3 mb-md-0">
                <div className="feature-item featureline">
                <i className="bi bi-currency-dollar"></i>
                <div>
                    <h5>Money return</h5>
                    <p>30 days for free return</p>
                </div>
                </div>
            </div>

            <div className="col-md-3 col-12">
                <div className="feature-item ">
                <i className="bi bi-shield-lock"></i>
                <div>
                    <h5>Secured payment</h5>
                    <p>Payment cards accepted</p>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>

    </>
  );
}
