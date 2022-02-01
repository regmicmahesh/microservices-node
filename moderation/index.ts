import axios from "axios";
import express from "express";

const app = express();

app.use(express.json());

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const status = content.includes("orange") ? "rejected" : "approved";

    axios
      .post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          id,
          postId,
          status,
          content,
        },
      })
      .catch((err) => console.log(err));
    res.end();
  }
});

app.listen(4003, () => {
  console.log("Server is running on port 4003");
});
