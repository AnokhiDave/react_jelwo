import { SaveContactMessage } from "../Models/ContactModel.js";

export const CreateContact = async (req, res) => {
  try {
    const { full_name, email, mobile, message } = req.body;

    if (!full_name || !email || !message) {
      res.status(400).json({ message: "Required fields missing" });
      return res.end();
    }

    await SaveContactMessage({
      full_name,
      email,
      mobile,
      message,
    });

    // ✅ FORCE RESPONSE CLOSE (THIS IS THE FIX)
    res.status(200).json({ message: "Message sent successfully" });
    return res.end();

  } catch (error) {
    res.status(500).json({ message: "Server error" });
    return res.end();
  }
};
