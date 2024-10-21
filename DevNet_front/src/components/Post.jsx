import axios from "axios";
import React, { useEffect, useState } from "react";

const Post = ({ id, content, likes: initLike, handleDelete, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [likes, setLikes] = useState(initLike);
  const [isEditing, setIsEditing] = useState(false); // Corrected state variable name
  const [updatedContent, setUpdatedContent] = useState(content);

  // Function to handle like button click
  const addLikes = async () => {
    try {
      const updatedLikes = likes + 1;
      await axios.patch(`http://localhost:3000/api/posts/${id}`, {
        likes: updatedLikes,
      });
      setLikes(updatedLikes);
    } catch (error) {
      console.error("error updating likes", error);
    }
  };
useEffect(()=>{
  const handleContentUpdate = async () => {
    try {
      await axios.patch(`http://localhost:3000/api/posts/${id}`, {
        content: updatedContent,
      });
      setIsEditing(false);
        
    } catch (error) {
      console.error("error updating the post", error);
    }
  };
})

  return (
    <div>
      <div className="card bg-gray-800 w-full shadow-xl">
        <div className="card-body">
          <div className="card-actions justify-end">
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button">
                <svg
                  className="w-6 h-6 text-white dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M12 6h.01M12 12h.01M12 18h.01"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
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
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="text-gray-200 text-sm">{formattedDate}</div>
              {isEditing ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    className="input input-bordered input-info w-full h-20 mb-2 resize-none"
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                  />
                  <button
                    className="btn btn-outline btn-info"
                    onClick={handleContentUpdate}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="font-lato text-gray-200">{content}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="font-lato">
        <button className="btn" onClick={addLikes}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
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
          {likes}
          <span>{likes === 1 ? "Like" : "likes"}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
