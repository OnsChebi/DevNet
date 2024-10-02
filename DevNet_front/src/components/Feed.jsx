import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Post from "./Post";
import axios from "axios";

const Feed = () => {
  //setting up the state for posts
  const [posts, setPosts] = useState([]);

  //post feching ml back
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios("http://localhost:3000/api/posts");
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error feching posts: ", error);
      }
    };
    fetchPosts();
  
  },[]);

  return (
    <div>
      <div className="flex flex-col h-screen">
        <Navbar />
        {/* <div className="sidebar">
          <Sidebar />
        </div> */}
        <div className="posts flex flex-col gap-4 p-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Post key={post.id} content={post.content} likes={post.likes} createdAt={post.createdAt} />
            ))
          ) : (
            <div className="text-gray-600">No posts available</div> // Optional: message if no posts are found
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
