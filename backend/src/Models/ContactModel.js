import Db from "../Config/db.js";

export const SaveContactMessage = async (data) => {
  const sql =
    "INSERT INTO contact_messages (full_name, email, mobile, message) VALUES (?, ?, ?, ?)";

  await Db.execute(sql, [
    data.full_name,
    data.email,
    data.mobile || null,
    data.message,
  ]);
};
