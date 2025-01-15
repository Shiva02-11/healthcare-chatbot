import React from "react";

const Header = ({ title, toggleTheme }) => {
  return (
    <div className="fixed top-0 left-64 w-[calc(100%-16rem)] flex items-center justify-between bg-gray-800 text-white px-4 py-2 shadow-md z-50">
      <h1 className="text-lg font-bold">{title}</h1>
      <button
        onClick={toggleTheme}
        className="bg-gray-700 hover:bg-gray-500 text-white px-4 py-2 rounded"
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default Header;
