import db from "../Config/db.js";

// Get all addresses of user
export const getAddressesByUser = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM address WHERE UserID = ? AND IsDeleted = 0 ORDER BY IsDefault DESC",
    [userId]
  );
  return rows;
};

// Add new address
export const createAddress = async (data) => {
  const {
    UserID, FirstName, LastName, Company,
    Address1, Address2, City, Country,
    PostalCode, Phone, IsDefault
  } = data;

  if (IsDefault) {
    await db.query(
      "UPDATE address SET IsDefault = 0 WHERE UserID = ?",
      [UserID]
    );
  }

  const [result] = await db.query(
    `INSERT INTO address 
     (UserID, FirstName, LastName, Company, Address1, Address2, City, Country, PostalCode, Phone, IsDefault)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [UserID, FirstName, LastName, Company, Address1, Address2, City, Country, PostalCode, Phone, IsDefault]
  );

  return result;
};

// Update address
export const updateAddress = async (id, userId, data) => {
  if (data.IsDefault) {
    await db.query("UPDATE address SET IsDefault = 0 WHERE UserID = ?", [userId]);
  }

  const [result] = await db.query(
    `UPDATE address 
     SET FirstName=?, LastName=?, Company=?, Address1=?, Address2=?, City=?, Country=?, PostalCode=?, Phone=?, IsDefault=?
     WHERE AddressID=? AND UserID=?`,
    [
      data.FirstName, data.LastName, data.Company, data.Address1, data.Address2,
      data.City, data.Country, data.PostalCode, data.Phone, data.IsDefault, id, userId
    ]
  );

  return result;
};

// Delete address
export const deleteAddress = async (id, userId) => {
  const [result] = await db.query(
    "UPDATE address SET IsDeleted = 1 WHERE AddressID = ? AND UserID = ?",
    [id, userId]
  );
  return result;
};
