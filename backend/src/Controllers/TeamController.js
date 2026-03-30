// src/Controllers/TeamController.js
import { getTeam, addTeamMember } from "../Models/TeamModel.js";

export const fetchTeam = async (req, res) => {
  try {
    const data = await getTeam();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch team members" });
  }
};

export const createTeamMember = async (req, res) => {
  const { team_name, team_role, team_image } = req.body;

  if (!team_name || !team_role || !team_image) {
    return res.status(400).json({
      message: "team_name, team_role, and team_image are required",
    });
  }

  try {
    const result = await addTeamMember({ team_name, team_role, team_image });
    res.status(201).json({
      message: "Team member added successfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add team member" });
  }
};
