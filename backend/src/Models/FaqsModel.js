import db from "../Config/db.js";

/**
 * GET ALL FAQs
 */
export const getAllFaqs = async () => {
  const [rows] = await db.query(
    "SELECT id, category, question, answer FROM faqs ORDER BY id DESC"
  );
  return rows;
};

/**
 * INSERT FAQ
 */
export const insertFaq = async (category, question, answer) => {
  const [result] = await db.query(
    "INSERT INTO faqs (category, question, answer) VALUES (?, ?, ?)",
    [category, question, answer]
  );
  return result;
};
