import { findEmail, insertEmail } from "../Models/SubscribeModel.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const exists = await findEmail(email);
    if (exists) {
      return res.status(409).json({ message: "Email already subscribed" });
    }

    await insertEmail(email);

    res.status(201).json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
