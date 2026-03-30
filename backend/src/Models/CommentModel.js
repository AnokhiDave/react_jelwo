import db from "../Config/db.js";

/* GET comments by blog */
export const getCommentsByBlogModel = async (blogId) => {
  const [rows] = await db.query(
    "SELECT * FROM comments WHERE blog_id = ? ORDER BY created_at DESC",
    [blogId]
  );
  return rows;
};

/* POST comment */
export const addCommentModel = async (data) => {
  const { blog_id, name, email, message } = data;

  const [result] = await db.query(
    "INSERT INTO comments (blog_id, name, email, message) VALUES (?, ?, ?, ?)",
    [blog_id, name, email, message]
  );

  return result;
};
