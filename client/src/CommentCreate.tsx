import { FormEvent, useState } from "react";
import axios from "axios";

export interface CommentCreateProps {
  postId: string;
}

const CommentCreate: React.FC<CommentCreateProps> = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="content">New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            className="form-control"
            id="content"
            placeholder="content"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
