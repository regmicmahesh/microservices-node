import express from "express";
import { randomBytes } from "crypto";
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

export interface Post {
  id: string;
  title: string;
}

const posts: Record<string, Post> = {};

app.get("/posts", (_req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");
  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
