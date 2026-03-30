import db from "../Config/db.js";

/* GET ALL TESTIMONIALS */
export const getTestimonial = async () => {
  const sql = "SELECT * FROM testimonials";
  const [rows] = await db.query(sql);
  return rows;
};

/* ADD NEW TESTIMONIAL */
export const addTestimonial = async (data) => {
  const sql = `
    INSERT INTO testimonials 
      (testimonial_name, testimonial_role, testimonial_review, testimonial_rating, testimonial_image) 
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [
    data.testimonial_name,
    data.testimonial_role,
    data.testimonial_review,
    data.testimonial_rating,
    data.testimonial_image
  ];

  const [result] = await db.query(sql, values);
  return result; // contains insertId
};
