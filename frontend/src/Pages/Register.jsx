import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle register
  const handleCreateAccount = async () => {
    if (!agreed) return;

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );

      // ✅ SAVE TOKEN & USER
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      Swal.fire({
        icon: "success",
        title: "Welcome 🎉",
        text: "Account created successfully!",
        confirmButtonColor: "#000",
      }).then(() => {
        navigate("/profile"); // 🔥 go directly to profile
        window.dispatchEvent(new Event("storage")); // update navbar
      });

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= CSS ================= */}
      <style>{`
        .register-header {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }
        .register-header::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }
        .register-header-content {
          position: relative;
          z-index: 1;
        }
        .register-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 80px;
        }
        .register-box {
          width: 100%;
          max-width: 600px;
          margin-bottom: 5%;
        }
        .register-title {
          text-align: center;
          font-size: 40px;
          margin-bottom: 50px;
        }
        .form-group {
          margin-bottom: 28px;
        }
        .form-group input {
          width: 100%;
          padding: 14px 12px;
          font-size: 16px;
          border: 1px solid #e0e0e0;
        }
        .terms {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }
        .create-btn {
          margin-top: 35px;
          background-color: #cfcfcf;
          color: #fff;
          border: none;
          padding: 14px 50px;
          font-size: 16px;
          border-radius: 30px;
          cursor: not-allowed;
        }
        .create-btn.active {
          background-color: #000;
          cursor: pointer;
        }
        .error {
          color: red;
          text-align: center;
          margin-bottom: 20px;
        }
      `}</style>

      {/* ================= HEADER ================= */}
      <section className="register-header">
        <div className="register-header-content">
          <div className="breadcrumb-text">HOME - REGISTER</div>
          <h1>Register</h1>
        </div>
      </section>

      <div className="register-container">
        <div className="register-box">
          <h1 className="register-title">Create account</h1>

          {error && <p className="error">{error}</p>}

          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              name="FirstName"
              placeholder="First name"
              value={formData.FirstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              name="LastName"
              placeholder="Last name"
              value={formData.LastName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="Email"
              placeholder="Email address"
              value={formData.Email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={formData.Password}
              onChange={handleChange}
            />
          </div>

          <div className="terms">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            <p style={{ marginBottom: "0px" }}>
              I have read and agree with the <span>Terms and condition</span>
            </p>
          </div>

          <button
            onClick={handleCreateAccount}
            className={`create-btn ${agreed ? "active" : ""}`}
            disabled={!agreed || loading}
          >
            {loading ? "CREATING..." : "CREATE"}
          </button>
        </div>
      </div>
    </>
  );
}
