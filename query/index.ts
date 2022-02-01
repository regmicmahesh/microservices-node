import axios from "axios";
import express from "express";
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

export interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  status: string;
}

const posts: Record<string, Post> = {};

app.get("/posts", (req, res) => {
  res.json(posts);
});

const handleEvent = (type: string, data: any) => {
  switch (type) {
    case "PostCreated":
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    case "CommentCreated":
      const { postId, content, id: commentId, status } = data;
      posts[postId].comments.push({ id: commentId, content, status });
      break;
    case "CommentUpdated":
      const {
        postId: postId2,
        content: content2,
        id: commentId2,
        status: status2,
      } = data;
      const post = posts[postId2];
      const comment = post.comments.find((c) => c.id === commentId2);
      if (comment) {
        comment.content = content2;
        comment.status = status2;
      }
      break;
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
});

app.listen(4002, async () => {
  console.log("Listening on 4002");

  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    console.log("Processing Event:", event.type);
    handleEvent(event.type, event.data);
  }
});
