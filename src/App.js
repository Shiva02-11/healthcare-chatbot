import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

// Components
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message with timestamp
    setMessages((prev) => [
      ...prev,
      { role: "User", content: message, timestamp: new Date().toLocaleTimeString() },
    ]);

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/query", {
        question: message,
      });

      // Simulate typewriter effect for bot's response
      const botMessage = response.data.answer;
      const botTimestamp = new Date().toLocaleTimeString();
      simulateTypingEffect(botMessage, botTimestamp);

    } catch (error) {
      console.error("Error fetching data:", error);

      // Simulate typewriter effect for error message
      const errorMessage = "Oops! Something went wrong. Please try again.";
      const errorTimestamp = new Date().toLocaleTimeString();
      simulateTypingEffect(errorMessage, errorTimestamp);
    }
  };

  // Helper function to simulate typewriter effect
  const simulateTypingEffect = (message, timestamp) => {
    let currentIndex = 0;
    setTypingMessage(""); // Clear existing typing state

    const typeLetter = () => {
      if (currentIndex < message.length) {
        setTypingMessage((prev) => prev + message[currentIndex]);
        currentIndex++;
        setTimeout(typeLetter, 50); // Adjust typing speed (in milliseconds)
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "Bot", content: message, timestamp },
        ]);
        setTypingMessage("");
        setIsLoading(false);
      }
    };

    typeLetter();
  };



  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-4 transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-800"
        }`}
    >
      <div className="w-full max-w-2xl md:w-3/4 lg:w-1/2 bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden">
        <Header
          title="Healthcare Assistance"
          toggleTheme={() => setDarkMode(!darkMode)}
          darkMode={darkMode}
          toggleSidebar={toggleSidebar}
        />
        <ChatWindow
          ref={chatWindowRef}
          messages={messages}
          darkMode={darkMode}
          isLoading={isLoading}
          typingMessage={typingMessage}
          isSidebarOpen={isSidebarOpen}
        />
        <InputBox onSendMessage={handleSendMessage} darkMode={darkMode} />
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default App;