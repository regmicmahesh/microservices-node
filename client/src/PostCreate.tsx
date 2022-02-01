import { FormEvent, useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post("http://posts.com/posts/create", {
      title,
    });

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
