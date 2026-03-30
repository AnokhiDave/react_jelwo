import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Faqs() {
  const [expanded, setExpanded] = useState(false);
  const [faqs, setFaqs] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  /* ================= FETCH FAQ DATA ================= */
  useEffect(() => {
    fetch("http://localhost:5000/api/faqs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFaqs(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {/* ===================== CSS (ONE TAG ONLY) ===================== */}
      <style>{`
        .faq-header {
          height: 165px;
          background: url("../images/Main-Header.webp") center/cover no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
        }

        .faq-header::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }

        .faq-header-content {
          position: relative;
          z-index: 1;
        }

        .container {
          max-width: 1300px;
        }
         
        .faq-link{
          text-decoration: none;
          color: #000;
          font-size: 20px;
        }

        .faq-link:hover{
          text-decoration: underline;
          color: #a77f66;
          font-size: 20px;
        }

        .faq-section {
          padding: 80px 0;
        }

        .faq-sidebar {
          border-right: 1px solid #eee;
          margin-right: 50px;
        }

        .faq-sidebar h6 {
          font-size: 16px;
          color: #a77f66;
          margin-bottom: 15px;
        }

        .faq-sidebar ul {
          list-style: none;
          padding: 0;
        }

        .faq-sidebar li {
          margin-bottom: 12px;
          font-size: 18px;
          font-weight: 500;
        }

        .faq-title {
          font-size: 30px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .MuiAccordion-root {
          box-shadow: none !important;
        }

        .MuiAccordionSummary-root {
          padding: 0;
        }

        .MuiAccordionDetails-root {
          padding: 10px 0 20px 0;
          color: #666;
        }
      `}</style>

      {/* ===================== HEADER ===================== */}
      <div className="faq-header">
        <div className="faq-header-content">
          <small>HOME - FAQ'S</small>
          <h1>Faq's</h1>
        </div>
      </div>

      {/* ===================== CONTENT ===================== */}
      <div className="container faq-section">
        <div className="row">
          {/* ================= LEFT SIDEBAR (STATIC) ================= */}
          <div className="col-md-2 faq-sidebar">
            <h6>MOST COMMON</h6>
              <ul>
              <li style={{ fontSize: "30px" }}>Questions</li>
              <br />

              <li>
                <NavLink to="/Login" className="faq-link">
                  My Account
                </NavLink>
              </li>

              <li>
                <NavLink to="/Privacy" className="faq-link">
                  Company Policies
                </NavLink>
              </li>

              <li>
                <NavLink to="/refund" className="faq-link">
                  Payment Options
                </NavLink>
              </li>

              <li>
                <NavLink to="/terms" className="faq-link">
                  Term and Conditions
                </NavLink>
              </li>
            </ul>

          </div>

          {/* ================= RIGHT CONTENT (DYNAMIC) ================= */}
          <div className="col-md-9">
            <h5 className="faq-title">Frequently Asked Questions</h5>

            {faqs.map((faq) => (
              <Accordion
                key={faq.id}
                expanded={expanded === faq.id}
                onChange={handleChange(faq.id)}
              >
                <AccordionSummary
                  expandIcon={
                    expanded === faq.id ? <RemoveIcon /> : <AddIcon />
                  }
                >
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {faq.answer}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
