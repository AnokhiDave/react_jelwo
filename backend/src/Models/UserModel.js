import db from "../Config/db.js";

// find user by email
export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM `user` WHERE Email = ?",
    [email]
  );
  return rows;
};

// create new user
export const createUser = async (firstName, lastName, email, password) => {
  const [result] = await db.query(
    "INSERT INTO `user` (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)",
    [firstName, lastName, email, password]
  );
  return result;
};

// find user by ID
export const findUserById = async (id) => {
  const [rows] = await db.query(
    "SELECT UserID, FirstName, LastName, Email FROM `user` WHERE UserID = ?",
    [id]
  );
  return rows;
};
 