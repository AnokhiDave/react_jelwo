import db from "../Config/db.js";

/* ================= GET ALL REELS ================= */
export const getAllReels = async () => {
  const [rows] = await db.query(
    `SELECT 
        r.ReelID,
        r.ReelTitle,
        r.ReelVideo,
        r.ReelThumb,
        r.ProductID,
        p.prod_title,
        p.prod_price,
        p.prod_image
     FROM reels r
     JOIN products p ON p.prod_id = r.ProductID
     WHERE r.IsDeleted = 0`
  );

  return rows;
};

/* ================= ADD REEL ================= */
export const addReel = async (data) => {
  const { ReelTitle, ReelVideo, ReelThumb, ProductID } = data;

  await db.query(
    `INSERT INTO reels 
     (ReelTitle, ReelVideo, ReelThumb, ProductID)
     VALUES (?, ?, ?, ?)`,
    [ReelTitle, ReelVideo, ReelThumb, ProductID]
  );

  return { message: "Reel added successfully" };
};

/* ================= DELETE REEL ================= */
export const deleteReel = async (id) => {
  await db.query(
    "UPDATE reels SET IsDeleted = 1 WHERE ReelID = ?",
    [id]
  );

  return { message: "Reel deleted" };
};