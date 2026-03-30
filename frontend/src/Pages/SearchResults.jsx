import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q");

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/search?q=${query}`
        );
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (query) fetchSearch();
  }, [query]);

  if (loading) {
    return (
      <h3 style={{ textAlign: "center", marginTop: "120px" }}>
        Searching...
      </h3>
    );
  }

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        style={{
          height: "200px",
          background: `url("/images/Main-Header.webp") center/cover no-repeat`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
          }}
        ></div>

        <div style={{ position: "relative", textAlign: "center" }}>
          <p>HOME - SEARCH</p>
          <h2>
            Search: {products.length} results found for "{query}"
          </h2>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <div className="container py-5">
        {products.length === 0 ? (
          <h4 className="text-center">No products found</h4>
        ) : (
          <div className="row g-4">
            {products.map((p) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6"
                key={p.prod_id}
              >
                <div
                  style={{
                    background: "#f7f7f7",
                    border: "1px solid #eee",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(`/product-details/${p.prod_id}`)
                  }
                >
                  <div style={{ padding: "30px", textAlign: "center" }}>
                    <img
                      src={`http://localhost:5000/images/Jewelry/${p.prod_image}`}
                      alt={p.prod_title}
                      style={{ maxWidth: "100%" }}
                    />
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid #eee",
                      padding: "15px",
                      textAlign: "center",
                    }}
                  >
                    <small style={{ color: "#999" }}>
                      {p.prod_category}
                    </small>
                    <h6>{p.prod_title}</h6>
                    <span style={{ color: "#b08968", fontWeight: 600 }}>
                      ₹{p.prod_price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}