import { getAllFaqs, insertFaq } from "../Models/FaqsModel.js";

export const fetchFaqs = async (req, res) => {
  try {
    const faqs = await getAllFaqs();

    return res.status(200).json({
      success: true,
      data: faqs
    });
  } catch (error) {
    console.error("❌ FETCH ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch FAQs"
    });
  }
};

export const addFaq = async (req, res) => {
  const { category, question, answer } = req.body;

  if (!category || !question || !answer) {
    return res.status(400).json({
      success: false,
      message: "All fields required"
    });
  }

  try {
    await insertFaq(category, question, answer);

    return res.status(201).json({
      success: true,
      message: "FAQ added successfully"
    });
  } catch (error) {
    console.error("❌ INSERT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add FAQ"
    });
  }
};
