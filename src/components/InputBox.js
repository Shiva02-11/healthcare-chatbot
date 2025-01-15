import React, { useState } from "react";

const InputBox = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput(""); // Clear the input field
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission (if inside a form)
      handleSend(); // Trigger message send on Enter key press
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-gray-800 text-white px-4 py-2 shadow-md z-50 sm:left-64 sm:w-[calc(100%-16rem)]">
      <input
        type="text"
        className="flex-1 border rounded-lg p-3 bg-white dark:bg-gray-700 dark:text-white text-black"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
        onKeyDown={handleKeyDown}
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default InputBox;