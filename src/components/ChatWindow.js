import React, { forwardRef, useEffect, useRef } from "react";

const ChatWindow = forwardRef(({ messages, darkMode, isLoading, typingMessage, isSidebarOpen }, ref) => {
  const scrollAnchorRef = useRef(null); // Anchor for scrolling

  useEffect(() => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingMessage]); // Scroll whenever messages or typing message changes

  return (
    <div
      ref={ref}
      className={`absolute top-16 left-0 right-0 h-[calc(100vh-8rem)] ${darkMode ? "bg-gray-800" : "bg-gray-100"} overflow-y-auto p-4 ${isSidebarOpen ? "ml-64" : ""}`}
    >
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex items-start mb-3 ${msg.role === "User" ? "justify-end" : "justify-start"}`}
        >
          {/* Bot Avatar */}
          {msg.role === "Bot" && (
            <img
              src="./health.jpg"
              alt="Bot Avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
          )}

          {/* Message Bubble and Timestamp */}
          <div className={`flex-1 ${msg.role === "User" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block px-4 py-2 rounded-lg whitespace-pre-wrap ${msg.role === "User" ? "bg-[#f6d809] text-black" : "bg-[#a4dad2] text-black"} max-w-full`}
              title={`Sent at: ${msg.timestamp}`}
            >
              {msg.content}
            </div>
            <div
              className={`text-xs mt-1 ${darkMode ? "text-gray-300" : "text-gray-500"}`}
            >
              {msg.timestamp}
            </div>
          </div>

          {/* User Avatar */}
          {msg.role === "User" && (
            <img
              src="./user.jpg"
              alt="User Avatar"
              className="w-10 h-10 rounded-full ml-3"
            />
          )}
        </div>
      ))}

      {/* Typing Effect */}
      {typingMessage && (
        <div className="flex items-start mb-3">
          <img
            src="./health.jpg"
            alt="Bot Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div
            className="flex-1 inline-block px-4 py-2 rounded-lg bg-[#a4dad2] text-black max-w-[75%] whitespace-pre-wrap overflow-hidden text-ellipsis"
          >
            {typingMessage.split("").map((char, idx) => (
              <span key={idx}>{char}</span>
            ))}
            <span className="animate-blink font-bold text-black">|</span>
          </div>
        </div>
      )}



      {/* Typing Indicator */}
      {isLoading && (
        <div className="text-center text-gray-500 mt-3">Bot is typing...</div>
      )}

      {/* Scroll Anchor */}
      <div ref={scrollAnchorRef}></div>
    </div>
  );
});

export default ChatWindow;
