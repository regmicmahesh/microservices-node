import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

export interface Comment {
  id: string;
  content: string;
  status: string;
}

type PostID = string;

const commentsByPostId: Record<PostID, Comment[]> = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const comments = commentsByPostId[postId];
  if (comments) {
    res.json(comments);
  } else {
    res.status(404).send();
  }
});

app.post("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;
  const id = randomBytes(4).toString("hex");
  const comment: Comment = { id, content, status: "pending" };
  commentsByPostId[postId] = commentsByPostId[postId] || [];
  commentsByPostId[postId].push(comment);

  axios.post("http://event-bus-svc:4005/events", {
    type: "CommentCreated",
    data: {
      postId: postId,
      id: comment.id,
      content: comment.content,
      status: comment.status,
    },
  });

  res.status(201).json(comment);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, id, status } = data;
    const comments = commentsByPostId[postId];
    if (comments) {
      const comment = comments.find((c) => c.id === id);
      if (comment) {
        comment.status = status;
      }
    }
    await axios.post("http://event-bus-svc:4005/events", {
      type: "CommentUpdated",
      data,
    });
  }
  return res.json({});
});

app.listen(4001, () => {
  console.log("comments server is running on port 4001");
});
