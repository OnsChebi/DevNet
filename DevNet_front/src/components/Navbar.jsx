import React, { useState } from "react";
import { Input } from "@material-tailwind/react";


const Navbar = ({ theme, onThemeToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/******************** Navbar ********************/}
      <div className="navbar bg-[#0d49ca] text-white">
        {/******************** Logo ********************/}
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-black dark:text-white">
            DevNet
          </a>
        </div>

        {/******************** Mobile Menu Button ********************/}
        <div className="flex-none lg:hidden">
          <button
            className="btn btn-ghost btn-circle"
            onClick={toggleSidebar}
          >
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/******************** Navbar Items for Desktop ********************/}
        <div className="hidden lg:flex flex-none gap-4">
          {/******************** Search Bar ********************/}
            <Input
            color="black"
            
              type="text"
              className="grow bg-white dark:bg-blue-gray-900  text-black dark:text-white "
              placeholder="Search"
              icon={ <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>}
            />
           

          {/******************** Theme Toggle ********************/}
          <button
            onClick={onThemeToggle}
            className="btn btn-ghost btn-circle text-black dark:text-white"
          >
            {theme === "light" ? (
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
                  strokeWidth={2}
                  d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l1.414-1.414M6.05 6.05L4.636 4.636M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
          </button>

          {/******************** Notifications ********************/}
          <button className="btn btn-ghost btn-circle text-black dark:text-white">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
          </button>

          {/******************** Profile ********************/}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/******************** Sidebar for Mobile ********************/}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-10 flex flex-col bg-gray-200 dark:bg-black p-6  ">
          <button
            className="self-end btn text-[#0d49ca] btn-ghost btn-circle mb-4"
            onClick={toggleSidebar}
          >
            ✖
          </button>
            <Input color="blue"
              type="text"
              className="grow  text-black dark:text-white  "
              placeholder="Search"
              icon={ <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>}
            />
            
          <button
            onClick={onThemeToggle}
            className="btn btn-ghost bg-[#0d49ca] text-black dark:text-white my-2"
          >
            {theme==="light" ? "Dark Mode" : "Light Mode"}
          </button>
          <button
            
            className="btn btn-ghost bg-[#0d49ca] text-black dark:text-white my-2"
          >
            Profile
          </button>
          <button
           
            className="btn btn-ghost bg-[#0d49ca] text-black dark:text-white my-2"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
