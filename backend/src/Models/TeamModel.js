// src/Models/TeamModel.js
import db from "../Config/db.js";

/* GET ALL TEAM MEMBERS */
export const getTeam = async () => {
  const sql = "SELECT * FROM team";
  const [rows] = await db.query(sql);
  return rows;
};

/* ADD TEAM MEMBER */
export const addTeamMember = async (data) => {
  const sql =
    "INSERT INTO team (team_name, team_role, team_image) VALUES (?, ?, ?)";
  const values = [data.team_name, data.team_role, data.team_image];

  const [result] = await db.query(sql, values);
  return result; // contains insertId
};
