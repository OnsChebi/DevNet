import React, { useState } from "react";
import { FaStar, FaUserEdit } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Jane Doe",
    bio: "Full-Stack Developer passionate about building modern and scalable web applications.",
    profilePicture: "https://via.placeholder.com/150",
    skills: ["JavaScript", "React", "Node.js", "TailwindCSS", "MySQL"],
    projects: [
      { name: "Portfolio Website", link: "https://example.com" },
      { name: "E-commerce App", link: "https://example.com" },
    ],
    links: {
      github: "https://github.com/janedoe",
      linkedin: "https://linkedin.com/in/janedoe",
      website: "https://janedoe.dev",
    },
    followers: ["John Smith", "Alice Johnson", "Robert Brown"],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = {
      ...user,
      name: formData.get("name"),
      bio: formData.get("bio"),
      profilePicture: newProfilePicture || user.profilePicture,
    };
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center space-x-6">
            <img
              src={newProfilePicture || user.profilePicture}
              alt={`${user.name}'s Profile`}
              className="w-24 h-24 rounded-full border-4 border-blue-500"
            />
            <div>
              <h1 className="text-3xl font-semibold">{user.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{user.bio}</p>
              <button
                onClick={handleEditToggle}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow flex items-center space-x-2 hover:bg-blue-600"
              >
                <FaUserEdit />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/*----------------- Followers Section --------------------------*/}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold">Followers</h2>
          <ul className="mt-4">
            {user.followers.map((follower, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b py-2"
              >
                <span>{follower}</span>
                <button className="px-4 py-1 bg-yellow-500 text-white rounded-full flex items-center space-x-1 hover:bg-yellow-600">
                  <FaStar />
                  <span>Follow</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 rounded-full text-sm shadow"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold">Projects</h2>
          <ul className="mt-4 space-y-3">
            {user.projects.map((project, index) => (
              <li key={index}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className="mb-4">
                  <label className="block mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.name}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Bio</label>
                  <textarea
                    name="bio"
                    defaultValue={user.bio}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
