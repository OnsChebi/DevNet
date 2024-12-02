import axios from "axios";
import React, { useEffect, useState } from "react";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);

 
  useEffect(() => {
    axios
      .get(`/api/comments/${postId}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, [postId]);

  
  const handleAddComment = () => {
    if (newComment.trim() === "") return; // Prevent empty comments

    axios
      .post(`/api/comments/${postId}`, {
        content: newComment,
        parent: replyTo,
      })
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment("");
        setReplyTo(null);
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  // fonction recursive to render comments
  const getComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment.id} style={{ marginLeft: comment.parent ? 20 : 0 }}>
        <p>{comment.content}</p>
        <button onClick={() => setReplyTo(comment.id)}>Reply</button>
        {comment.children && getComments(comment.children)}
      </div>
    ));
  };

  return (
    <div>
      <h3>Comments</h3>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        cols="30"
        rows="3"
      ></textarea>
      <button onClick={handleAddComment}>Submit</button>
      <div>{getComments(comments)}</div>
    </div>
  );
};

export default Comments;
