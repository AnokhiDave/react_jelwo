import mysql from "mysql2/promise";

// Safety check
if (!process.env.DB_USER) {
  throw new Error("❌ DB_USER is undefined. Check dotenv config.");
}

// Create pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// Test connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("☁✨ MySQL connected successfully");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
  }
})();

export default db;


