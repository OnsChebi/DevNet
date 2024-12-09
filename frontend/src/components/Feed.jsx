import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setnewPost] = useState("");

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
    <div className="bg-gray-300 dark:bg-black h-screen mt-5">
      <div className="flex   flex-col h-screen">
        <div className="container flex justify-center ">
          <div className="card bg-gray-100 dark:bg-blue-gray-900 text-black dark:text-gray-100 w-full lg:w-1/2 md:w-3/4   shadow-xl">
            <div className="card-body">
              <div className="flex-col">
              <div className="flex items-start gap-4">
                <div className="skeleton h-20 w-20  rounded-full"></div>
                <textarea
                  type="text"
                  placeholder="What do you have in mind?"
                  className="input input-bordered  bg-gray-300 dark:bg-black input-primary w-full h-16 sm:h-10 lg:h-24 m-0 "
                  value={newPost}
                  onChange={(e) => setnewPost(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="card-actions justify-end">
              <button
                className="btn btn-outline btn-primary"
                onClick={handlePostSubmit}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex  justify-center ">
          <div className=" flex-col flex gap-4  p-4">
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
              <div className="text-gray-600">No posts available</div> // Optional: message if no posts are found
            )}
          </div>
        </div>
      </div> 
      
      </div>
    
  );
};

export default Feed;
