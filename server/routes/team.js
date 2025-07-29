import express from "express";
import db from "../db/db.js";

const router = express.Router();

// POST /teams/create
router.post("/create", async (req, res) => {
  const { name, created_by } = req.body;
  try {
    const [team] = await db("simple_teams")
      .insert({ name, created_by })
      .returning("*");

    await db("simple_team_members").insert({
      team_id: team.id,
      user_name: created_by,
    });

    res.status(201).json(team);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Add member to team
router.post("/add-member", async (req, res) => {
  const { teamId, userName } = req.body;
  try {
    await db("simple_team_members").insert({
      team_id: teamId,
      user_name: userName,
    });
    res.send("Member added");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create task
router.post("/task", async (req, res) => {
  const { title, description, teamId, assignedTo, dueDate } = req.body;
  try {
    const [task] = await db("simple_tasks")
      .insert({
        title,
        description,
        team_id: teamId,
        assigned_to: assignedTo,
        due_date: dueDate,
      })
      .returning("*");
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get tasks for team or user
router.get("/tasks", async (req, res) => {
  const { teamId, userName } = req.query;
  try {
    let query = db("simple_tasks").select("*");

    if (teamId) query.where({ team_id: teamId });
    if (userName) query.orWhere({ assigned_to: userName });

    const tasks = await query;
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const teams = await db("simple_teams").select("*");
    res.status(200).json(teams);
  } catch (err) {
    console.error("Error fetching teams:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
