import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import StarIcon from "@mui/icons-material/Star";
import 'remixicon/fonts/remixicon.css';
import axios from "axios"; // <-- Axios for API requests

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);

  // Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/testimonials");
        setTestimonials(res.data); // Set state with API data
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      <style>{`
        .testimonial-section { background-color: #fff; text-align: center; }
        .testimonial-section h2 { font-family: "Playfair Display", serif; font-size: 36px; margin-bottom: 50px; color: #333; }
        .testimonial-card { background: #fff; border-radius: 10px; padding: 30px 20px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
        .testimonial-card p { color: #808080; font-weight: 600; text-align: left; font-size: 16px; margin-bottom: 20px; }
        .testimonial-card .rating { margin-bottom: 16px; display: flex; justify-content: left; align-items: center; }
        .testimonial-card .rating span { margin-left: 5px; font-size: 14px; color: #808080; font-weight: 500; }
        .testimonial-card .customer-info { display: flex; align-items: center; justify-content: space-between; }
        .testimonial-card .customer-info .details { text-align: left; }
        .testimonial-card .customer-info h6 { margin: 0; color: #a57f68; font-size: 20px; font-weight: 700; }
        .testimonial-card .customer-info small { color: #999; font-size: 18px; font-weight: 500; }
        .testimonial-card .customer-info img { width: 100px; height: 100px; border-radius: 50%; margin-right: 15px; }
        .testimonial-card .quote { font-size: 5rem; color: #a57f68; }

        @media (max-width: 768px) { .testimonial-card { padding: 25px 15px; } }
        @media (max-width: 576px) { .testimonial-card { padding: 20px 10px; } .testimonial-card p { font-size: 13px; } .testimonial-card .quote { font-size: 2.5rem; } }
        @media (max-width: 320px) { .testimonial-section h2 { font-size: 28px; } .testimonial-card p { font-size: 12px; } .testimonial-card .quote { font-size: 2rem; } }
      `}</style>

      <section className="testimonial-section">
        <div className="container">
          <h2>Happy Customers</h2>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{ 768: { slidesPerView: 2 } }}
          >
            {testimonials.map((testi, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-card">
                  <div className="rating">
                    {[...Array(testi.testimonial_rating)].map((_, i) => (
                      <StarIcon key={i} style={{ color: "#FFC107", marginRight: "2px" }} />
                    ))}
                    <span>({testi.testimonial_rating}.0 Reviews)</span>
                  </div>

                  <p>{testi.testimonial_review}</p>

                  <hr />

                  <div className="customer-info">
                    <div className="d-flex align-items-center">
                      <img src={`http://localhost:5000/images/Testimonials/${testi.testimonial_image}`} />
                      <div className="details">
                        <h6>{testi.testimonial_name}</h6>
                        <small>{testi.testimonial_role}</small>
                      </div>
                    </div>
                    <div className="quote">
                      <i className="ri-double-quotes-r"></i>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
