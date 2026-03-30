import { getTestimonial, addTestimonial } from "../Models/TestimonialModel.js";

// Fetch all testimonials
export const fetchTestimonial = async (req, res) => {
  try {
    const data = await getTestimonial();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
};

// Create a new testimonial
export const createTestimonial = async (req, res) => {
  const { testimonial_name, testimonial_role, testimonial_review, testimonial_rating, testimonial_image } = req.body;

  // Validate required fields
  if (!testimonial_name || !testimonial_role || !testimonial_review || !testimonial_rating || !testimonial_image) {
    return res.status(400).json({
      message: "testimonial_name, testimonial_role, testimonial_review, testimonial_rating, and testimonial_image are required",
    });
  }

  try {
    const result = await addTestimonial({ testimonial_name, testimonial_role, testimonial_review, testimonial_rating, testimonial_image });
    res.status(201).json({
      message: "Testimonial added successfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add testimonial" });
  }
};
