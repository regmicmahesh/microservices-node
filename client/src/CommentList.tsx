import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";

export interface Comment {
  id: string;
  content: string;
}

export interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);


  const renderedComments = comments.map(comment => <li key={comment.id}>{comment.content}</li>)

  return (
    <ul>
      {renderedComments}
    </ul>
  );
};
export default CommentList;
