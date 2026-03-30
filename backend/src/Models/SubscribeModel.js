import db from "../Config/db.js";

export const findEmail = async (email) => {
  const [rows] = await db.execute(
    "SELECT id FROM subscribers WHERE email = ?",
    [email]
  );
  return rows[0];
};

export const insertEmail = async (email) => {
  const [result] = await db.execute(
    "INSERT INTO subscribers (email) VALUES (?)",
    [email]
  );
  return result;
};
