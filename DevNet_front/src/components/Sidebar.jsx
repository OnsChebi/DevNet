import React from "react";

const Sidebar = () => {
  return (
    <div>
      <div className="max-w-l mt-6 ml-6 mx-auto">
        <aside className="w-64" aria-label="Sidebar">
          <div className="px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-700">
            <ul className="space-y-2">
              <li className="font-lato">Activity Feed</li>
              <li className="font-lato">Recent</li> 
              <li className="font-lato">Events</li> 
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
