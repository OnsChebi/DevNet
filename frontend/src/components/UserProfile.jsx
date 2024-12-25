import React, { useState } from "react";
import { FaStar, FaUserEdit, FaPlus } from "react-icons/fa";

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
  const [newSkill, setNewSkill] = useState("");
  const [newProject, setNewProject] = useState({ name: "", link: "" });
  const [showSkillInput, setShowSkillInput] = useState(false); // For skill input visibility
  const [showProjectInput, setShowProjectInput] = useState(false); // For project input visibility

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

  const handleAddSkill = () => {
    if (newSkill && !user.skills.includes(newSkill)) {
      setUser({
        ...user,
        skills: [...user.skills, newSkill],
      });
      setNewSkill("");
      setShowSkillInput(false); // Hide skill input after adding
    }
  };

  const handleAddProject = () => {
    if (newProject.name && newProject.link) {
      setUser({
        ...user,
        projects: [...user.projects, newProject],
      });
      setNewProject({ name: "", link: "" });
      setShowProjectInput(false); // Hide project input after adding
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setUser({
      ...user,
      skills: user.skills.filter((skill) => skill !== skillToDelete),
    });
  };

  const handleDeleteProject = (projectToDelete) => {
    setUser({
      ...user,
      projects: user.projects.filter((project) => project !== projectToDelete),
    });
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
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Skills</h2>
            <button
              onClick={() => setShowSkillInput(!showSkillInput)} // Toggle skill input visibility
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 rounded-full text-sm shadow flex justify-between items-center"
              >
                {skill}
                <button
                  onClick={() => handleDeleteSkill(skill)}
                  className="ml-2 text-red-500 hover:text-red-600"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          {showSkillInput && ( // Show input only if showSkillInput is true
            <div className="mt-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="px-4 py-2 border rounded-lg"
                placeholder="Add new skill"
              />
              <button
                onClick={handleAddSkill}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Projects Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Projects</h2>
            <button
              onClick={() => setShowProjectInput(!showProjectInput)} // Toggle project input visibility
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              <FaPlus />
            </button>
          </div>
          <ul className="mt-4 space-y-3">
            {user.projects.map((project, index) => (
              <li key={index} className="flex justify-between items-center">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {project.name}
                </a>
                <button
                  onClick={() => handleDeleteProject(project)}
                  className="text-red-500 hover:text-red-600"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
          {showProjectInput && ( //bch input ma todhhr ken wa9t nklikiw 3l plus
            <div className="mt-4">
              <input
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="px-4 py-2 border rounded-lg"
                placeholder="Project Name"
              />
              <input
                type="url"
                value={newProject.link}
                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                className="mt-2 px-4 py-2 border rounded-lg"
                placeholder="Project Link"
              />
              <button
                onClick={handleAddProject}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Editing Section */}
        {isEditing && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-6">
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
                  rows="3"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Profile Picture</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
