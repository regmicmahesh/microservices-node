import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";

export interface Comment {
  id: string;
  content: string;
  status: string;
}

export interface CommentListProps {
  postId: string;
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ postId, comments }) => {
  const renderedComments = comments.map((comment) => {
    if (comment.status === "approved") {
      return <li key={comment.id}>Approved: {comment.content}</li>;
    } else if (comment.status === "pending") {
      return <li key={comment.id}>Pending: {comment.content}</li>;
    } else {
      return <li key={comment.id}>Rejected: {comment.content}</li>;
    }
  });

  return <ul>{renderedComments}</ul>;
};
export default CommentList;
