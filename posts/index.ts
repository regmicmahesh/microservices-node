import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

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

app.post("/posts/create", async (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");
  posts[id] = { id, title };

  await axios.post("http://event-bus-svc:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
