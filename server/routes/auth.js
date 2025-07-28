import express from "express";
import bcrypt from "bcrypt";
import db from "../db/db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Incoming register request", req.body); // 🪵 log incoming data

  const hashed = await bcrypt.hash(password, 10);

  try {
    await db("users").insert({ name, email, password: hashed });
    console.log("User inserted"); // 🪵 log insert success
    res.status(201).send("User registered");
  } catch (err) {
    console.log("Insert error:", err.message);
    res.status(400).json({ error: err.detail });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db("users").where({ email }).first();
    if (!user) return res.status(400).send("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send("Wrong password");

    req.session.userId = user.id;
    res.send("Logged in");
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Something went wrong");
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Logout failed");
    res.clearCookie("connect.sid"); // cookie name might differ in deployment
    res.send("Logged out");
  });
});

export default router;
