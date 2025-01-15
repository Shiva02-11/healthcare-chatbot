import React from "react";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div>
      {/* Backdrop for Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-800 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform sm:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-5">Healthcare Assistance</h2>
          <ul className="space-y-2">
            <SidebarItem label="Dashboard" />
            <SidebarItem label="Kanban" badge="Pro" />
            <SidebarItem label="Inbox" badge="3" />
            <SidebarItem label="Users" />
            <SidebarItem label="Products" />
            <SidebarItem label="Sign In" />
            <SidebarItem label="Sign Up" />
          </ul>
        </div>
      </aside>
    </div>
  );
};

const SidebarItem = ({ label, badge }) => (
  <li>
    <a
      href="/"
      className="flex items-center px-2 py-3 text-gray-300 hover:bg-gray-700 rounded-lg"
    >
      {label}
      {badge && (
        <span className="ml-2 px-2 py-1 bg-gray-600 rounded-full text-sm">
          {badge}
        </span>
      )}
    </a>
  </li>
);

export default Sidebar;
