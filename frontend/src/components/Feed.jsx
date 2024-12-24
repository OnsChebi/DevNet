import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setnewPost] = useState("");

  // Fetching posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios("http://localhost:3000/api/posts");
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    if(newPost.trim()){
      try {
        alert("Input should not be empty");
        console.log(alert)
      const response = await axios.post("http://localhost:3000/api/posts", {
        content: newPost,
      });
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setnewPost("");
    } catch (err) {
      console.error("Error posting new post", err);
    }
  }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting the post", error);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen overflow-hidden">
      {/* Post creation area */}
      <div className="flex flex-col items-center px-4 py-5">
        <div className="card w-full max-w-lg md:max-w-3xl bg-white dark:bg-gray-800 text-black dark:text-gray-100 shadow-lg rounded-lg p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-4">
              <div className="bg-black size-16 rounded-full"></div>
              <textarea
                type="text"
                placeholder="What do you have in mind?"
                className="input input-bordered bg-gray-300 dark:bg-black w-full h-20 rounded-lg p-2 resize-none"
                value={newPost}
                onChange={(e) => setnewPost(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                className="btn btn-outline  hover:bg-[#0d49ca] px-6 py-2 rounded-md"
                onClick={handlePostSubmit}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed area */}
      <div className="flex flex-col items-center px-4 py-5">
        <div className="w-full max-w-lg md:max-w-3xl flex flex-col gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                username={post.username}
                content={post.content}
                likes={post.likes}
                createdAt={post.createdAt}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <div className="text-gray-600 text-center">
              No posts available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;