import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import moment from "moment";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const adminId = "675980503b55ec4b1208890b";
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const socket = io("https://chatbot.pizeonfly.com");

  const formatTime = (timestamp) => moment(timestamp).format("h:mm A");

  useEffect(() => {
    if (!userId || !token) {
      console.error("User ID or Token is missing");
      return;
    }

    // Join user-specific room
    socket.emit("join_room", userId);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://chatbot.pizeonfly.com/api/messages/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error.response?.data || error);
      }
    };

    fetchMessages();

    // Listen for real-time messages
    socket.on("receive_message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [userId, token]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("receiverId", adminId); // Use static admin ID
      formData.append("content", message);
      if (file) formData.append("attachment", file);

      const response = await axios.post("https://chatbot.pizeonfly.com/api/message", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newMessage = response.data.message;

      // Emit the message via socket
      socket.emit("send_message", newMessage);

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container p-4 flex flex-col items-center">
      <h1 className="text-bold text-xl sm:text-2xl p-2">Chat Support</h1>
      <div className="messages w-full sm:w-3/4 lg:w-2/3 overflow-y-scroll h-[70vh] border border-gray-300 rounded-lg p-4">
        {messages.map((msg, index) => (
        
          <div
            key={index}
            className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"} mb-2`}
          >
            <div className="flex flex-col">
            <div
              className={`p-3 rounded-lg max-w-xs sm:max-w-sm lg:max-w-md relative ${
                msg.senderId === userId
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200"
              }`}
            >
             {msg.content && <p>{msg.content}</p>}
                     {msg.attachment && (
                       <>
                        {msg.attachment.endsWith(".jpg") ||
                           msg.attachment.endsWith(".jpeg") ||
                           msg.attachment.endsWith(".png") ||
                          msg.attachment.endsWith(".gif") ? (
                           <img
                             src={`https://chatbot.pizeonfly.com/${msg.attachment}`}
                             alt="attachment"
                             className="max-w-full h-auto rounded-md mt-2"
                           />
                         ) : msg.attachment.endsWith(".mp4") ||
                           msg.attachment.endsWith(".webm") ||
                           msg.attachment.endsWith(".ogg") ? (
                           <video
                             src={`https://chatbot.pizeonfly.com${msg.attachment}`}
                             controls
                             className="max-w-full h-auto rounded-md mt-2"
                           />
                         ) : msg.attachment.endsWith(".pdf") ? (
                           <a
                             href={`https://chatbot.pizeonfly.com${msg.attachment}`}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="text-white-500 underline mt-2"
                           >
                             View PDF
                           </a>
                        ) : (
                          <p className="text-gray-500 mt-2">Unsupported file type</p>
                         )}
                      </>
                    )}
              
               </div>
               <div className={`text-xs mt-1 ${msg.senderId === userId ? "text-right" : "text-left"}`}>
                {formatTime(msg.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="send-message mt-4 flex items-center gap-2 w-full sm:w-3/4 lg:w-2/3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full flex-grow border border-gray-300 rounded p-2 resize-none"
          placeholder="Type your message here..."
        ></textarea>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" id="fileInput" />
        <label
          htmlFor="fileInput"
          className="cursor-pointer flex-shrink-0 text-gray-700 hover:text-blue-600"
        >
          <FaPaperclip size={20} />
        </label>
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
        >
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;





















































