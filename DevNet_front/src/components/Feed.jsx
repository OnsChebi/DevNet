import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Post from "./Post";
import axios from "axios";

const Feed = () => {
  //setting up the state for posts
  const [posts, setPosts] = useState([]);
  const [newPost, setnewPost] = useState("");

  //post feching ml back
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios("http://localhost:3000/api/posts");
        //console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error feching posts: ", error);
      }
    };
    fetchPosts();
  }, []);
  const handlePostSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/posts", {
        content: newPost,
      });
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setnewPost("");
    } catch (err) {
      console.error("error posting new post", err);
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
    <div>
      <div className="flex flex-col h-screen">
       
        {/* <div className="sidebar">
          <Sidebar />
        </div> */}
        <div className="container flex justify-center mt-10">
  <div className="card bg-gray-400 w-full sm:w-3/4 lg:w-1/2 shadow-xl">
    <div className="card-body">
      <div className="flex flex-col">
        <div className="flex items-start gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4 w-full">
            <textarea
              type="text"
              placeholder="What do you have in mind?"
              className="input input-bordered input-info w-full h-24 sm:h-20 lg:h-24 mb-4 resize-none"
              value={newPost}
              onChange={(e) => setnewPost(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="card-actions justify-end">
        <button className="btn btn-outline btn-info" onClick={handlePostSubmit}>
          Post
        </button>
      </div>
    </div>
  </div>
</div>

        <div className="container flex justify-center mt-4">
          <div className=" flex-col flex gap-4 w-1/2 p-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  content={post.content}
                  likes={post.likes}
                  createdAt={post.createdAt}
                  handleDelete={handleDelete}
                  
                />
              ))
            ) : (
              <div className="text-gray-600">No posts available</div> // Optional: message if no posts are found
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
