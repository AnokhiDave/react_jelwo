import express from "express";
import { fetchTestimonial, createTestimonial } from "../Controllers/TestimonialController.js";

const router = express.Router();

router.get("/", fetchTestimonial); // GET /api/testimonials
router.post("/", createTestimonial); // POST /api/testimonials

export default router;
