import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire("Logged out", "", "success");
        window.location.href = "/login";
      }
    });
  };

  return (
    <>
      <style>{`
        .profile-header {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .profile-header::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }

        .profile-header-content {
          position: relative;
          z-index: 1;
        }

        .breadcrumb-text {
          letter-spacing: 2px;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .profile-header h1 {
          font-family: "Playfair Display", serif;
          font-size: 48px;
        }

        .profile-page {
          margin: 60px auto;
        }

        .box {
          background: #f7f3ef;
          padding: 25px;
        }

        .links a {
          display: block;
          color: #555;
          margin-bottom: 10px;
          cursor: pointer;
        }

        .links a:hover {
          text-decoration: underline;
        }

        .order-title {
          margin-top: 80px;
          text-align: center;
          font-size: 32px;
        }

        .no-orders {
          color: red;
          text-align: center;
          margin-top: 20px;
        }
      `}</style>

      {/* ================= HEADER ================= */}
      <section className="profile-header">
        <div className="profile-header-content">
          <div className="breadcrumb-text">HOME - ACCOUNT</div>
          <h1>Account</h1>
        </div>
      </section>

      <div className="container profile-page">
        <h3 className="text-center mb-5">
          {user
            ? `${user.firstName} ${user.lastName}`
            : "Loading..."}
        </h3>

        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="row box">
              <div className="col-md-6">
                <h6>My account</h6>
                <div className="links">
                  <a href="/Address">View addresses (1)</a>
                  <a onClick={handleLogout}>Logout</a>
                </div>
              </div>

              <div className="col-md-6">
                <h6>Account details</h6>
                <p>{user?.country}</p>
                <p>{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-title">Orderhistory</div>
        <div className="no-orders">
          You haven't placed any orders yet.
        </div>
      </div>
    </>
  );
}
