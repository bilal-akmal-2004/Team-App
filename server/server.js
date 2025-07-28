import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import pg from "connect-pg-simple";
import cors from "cors";

import db from "./db/db.js";
import authFunc from "./routes/auth.js";

const pgSession = pg(session);
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Session
app.use(
  session({
    store: new pgSession({
      conObject: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
      },
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 },
  })
);

// Routes
app.use("/auth", authFunc);

app.get("/", (req, res) => res.send("Server is live 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
