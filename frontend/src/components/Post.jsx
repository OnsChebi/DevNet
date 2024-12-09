import axios from "axios";
import React, { useEffect, useState } from "react";

const Post = ({ id, username, content, likes: initLikes, handleDelete, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [likes, setLikes] = useState(initLikes);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);

  const addLikes = async () => {
    try {
      const updatedLikes = liked ? likes - 1 : likes + 1;
      setLiked(!liked);
      await axios.patch(`http://localhost:3000/api/posts/${id}`, {
        likes: updatedLikes,
      });
      setLikes(updatedLikes);
    } catch (error) {
      console.error("Error updating likes", error);
    }
  };

  const toggleComments = () => setShowComments(!showComments);

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, date: new Date(), username: "User" }]);
      setNewComment("");
    }
  };

  return (
    <div className="container flex justify-center  my-4">
      <div className="card bg-gray-300 dark:bg-blue-gray-900 text-black dark:text-gray-100 w-full lg:w-1/2 md:w-3/4 shadow-xl p-5">
        <div className="flex justify-between items-start">
          {/******************** User Profile  *******************/}
          <div className="flex items-start gap-4">
            <div className="skeleton h-12 w-12 rounded-full bg-gray-500"></div>
            <div>
              <div className="font-bold text-lg">{username}</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">{formattedDate}</div>
            </div>
          </div>

         
          <div >
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-sm btn-ghost">
                <svg
                  className="w-6 h-6 text-black dark:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M12 6h.01M12 12h.01M12 18h.01"
                  />
                </svg>
              </button>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
                <li>
                  <button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Cancel" : "Edit"}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleDelete(id)}>Delete</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/***********Post Content************* */}
        <div className="mt-4">
          {isEditing ? (
            <div>
              <textarea
                className="textarea textarea-bordered w-full mb-2"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={async () => {
                  try {
                    await axios.patch(`http://localhost:3000/api/posts/${id}`, {
                      content: updatedContent,
                    });
                    setIsEditing(false);
                  } catch (error) {
                    console.error("Error updating content", error);
                  }
                }}
              >
                Save
              </button>
              <button className="btn btn-primary ml-2 btn-sm" onClick={() => setIsEditing(!isEditing)}> Cancel</button>
            </div>
          ) : (
            <div className="text-gray-900 dark:text-gray-100">{content}</div>
          )}
        </div>

        {/* *******************Like Button*********************** */}
        <div className="flex  mt-4 border-t pt-2">
          <button
            className="flex flex-auto ml-3 items-center gap-2  hover:bg-gray-200 dark:hover:bg-gray-800 p-2"
            onClick={addLikes}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${liked ? "text-pink-500" : "text-gray-500"}`}
              fill={liked ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {likes} {likes === 1 ? "Like" : "Likes"}
          </button>
          {/* ************comment button************* */}
          <button
            className="flex items-center gap-2 flex-1 hover:bg-gray-200 dark:hover:bg-gray-800 p-2"
            onClick={toggleComments}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            Comment
          </button>
        </div>

        {/********************  comments system***************** */}
        {showComments && (
          <div className="mt-4">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start gap-4 mb-4">
                <div className="skeleton h-8 w-8 rounded-full bg-gray-500"></div>
                <div>
                  <div className="font-bold">{comment.username}</div>
                  <div className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</div>
                  <div>{comment.text}</div>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className="btn btn-primary btn-sm" onClick={addComment}>
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
