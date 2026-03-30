import express from "express";
import { fetchFaqs, addFaq } from "../Controllers/FaqsController.js";

const router = express.Router();

router.get("/faqs", fetchFaqs);
router.post("/faqs", addFaq);

export default router;
