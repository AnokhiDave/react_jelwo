import express from "express";
import { fetchTeam, createTeamMember } from "../Controllers/TeamController.js";

const router = express.Router();

router.get("/", fetchTeam); // GET /api/teams
router.post("/", createTeamMember); // POST /api/teams

export default router;
