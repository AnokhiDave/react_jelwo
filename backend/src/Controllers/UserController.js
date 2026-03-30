import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, findUserById } from "../Models/UserModel.js";

/* ================= PROFILE ================= */
export const getUserProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user[0].UserID,
      firstName: user[0].FirstName,
      lastName: user[0].LastName,
      email: user[0].Email,
      country: "India",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;

  try {
    if (!FirstName || !LastName || !Email || !Password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await findUserByEmail(Email);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const result = await createUser(
      FirstName,
      LastName,
      Email,
      hashedPassword
    );

    // ✅ AUTO LOGIN TOKEN
    const token = jwt.sign(
      { id: result.insertId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      user: {
        id: result.insertId,
        firstName: FirstName,
        lastName: LastName,
        email: Email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    if (!Email || !Password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await findUserByEmail(Email);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    } 

    const isPasswordMatch = await bcrypt.compare(
      Password,
      user[0].Password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user[0].UserID },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user[0].UserID,
        firstName: user[0].FirstName,
        lastName: user[0].LastName,
        email: user[0].Email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
