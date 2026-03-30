import db from "../Config/db.js";

/* GET all blogs */
export const getAllBlogModel = async () => {
  const [rows] = await db.query(
    "SELECT * FROM blog ORDER BY created_at DESC"
  );
  return rows;
};

/* GET single blog */
export const getSingleBlogModel = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM blog WHERE blog_id = ?",
    [id]
  );
  return rows;
};

/* CREATE blog */
export const createBlogModel = async (data) => {
  const sql = `
    INSERT INTO blog (
      blog_image, blog_title, blog_author, blog_date, blog_description, blog_subimage1, blog_subimage2, blog_submessage, blog_subdescription, blog_tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.blog_image, data.blog_title, data.blog_author, data.blog_date, data.blog_description, data.blog_subimage1, data.blog_subimage2, data.blog_submessage, data.blog_subdescription, data.blog_tags
  ];

  const [result] = await db.query(sql, values);
  return result;
};

/* GET recent blogs */
export const getRecentBlogModel = async () => {
  const [rows] = await db.query(
    "SELECT blog_id, blog_title, blog_image, blog_date FROM blog ORDER BY created_at DESC LIMIT 3"
  );
  return rows;
};