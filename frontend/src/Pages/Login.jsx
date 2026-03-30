import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= LOGIN HANDLER ================= */
  const handleSignIn = async () => {
    setError("");

    if (!email || !password) {
      Swal.fire("Error", "Please fill all fields", "warning");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Email: email, Password: password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      /* ===== SAVE AUTH DATA ===== */
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      /* 🔥 NOTIFY NAVBAR (NO RELOAD) */
      window.dispatchEvent(new Event("auth:changed"));
      window.dispatchEvent(new Event("wishlistUpdated"));

      /* ===== SUCCESS MESSAGE ===== */
      await Swal.fire("Success", "Logged in successfully!", "success");

      /* ===== NAVIGATE ===== */
      navigate("/");

    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigate("/Register");
  };

  return (
    <>
      <style>{`
        .login-header {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }

        .login-header::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }

        .login-header-content {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .breadcrumb-text {
          letter-spacing: 2px;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .login-header h1 {
          font-family: "Playfair Display", serif;
          font-size: 48px;
        }

        .login-container {
          max-width: 700px;
          margin: 80px auto;
          padding: 20px;
        }

        .login-title {
          text-align: center;
          font-size: 42px;
          margin-bottom: 50px;
        }

        .form-control {
          height: 55px;
          font-size: 16px;
        }

        .signin-btn,
        .create-btn {
          background-color: #b08a6c !important;
          color: #fff !important;
          border-radius: 30px !important;
          text-transform: uppercase;
        }

        .signin-btn {
          padding: 12px 40px !important;
        }

        .create-btn {
          padding: 14px 50px !important;
        }

        .forgot-link {
          font-size: 16px;
          color: #6c6c6c;
          cursor: pointer;
          text-decoration: underline;
        }

        .actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 25px;
        }

        .create-account {
          text-align: center;
          margin-top: 60px;
        }

        .error {
          color: red;
          text-align: center;
          margin-bottom: 20px;
        }
      `}</style>

      {/* ================= HEADER ================= */}
      <section className="login-header">
        <div className="login-header-content">
          <div className="breadcrumb-text">HOME - LOGIN</div>
          <h1>Login</h1>
        </div>
      </section>

      {/* ================= LOGIN FORM ================= */}
      <div className="login-container">
        <h1 className="login-title">Login account</h1>

        {error && <div className="error">{error}</div>}

        <div className="mb-4">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="actions-row">
          <Button
            className="signin-btn"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <span
            className="forgot-link"
            onClick={() =>
              Swal.fire("Info", "Forgot password coming soon", "info")
            }
          >
            Forgot your password?
          </span>
        </div>

        <div className="create-account">
          <Button className="create-btn" onClick={handleCreateAccount}>
            Create Account
          </Button>
        </div>
      </div>
    </>
  );
}