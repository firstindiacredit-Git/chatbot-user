import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import moment from "moment";
import { FaPaperclip, FaPaperPlane, FaTimes } from "react-icons/fa";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [property, setProperty] = useState(null);

  
  const adminId = property?.adminId;
  //console.log(adminId);
  // console.log(adminId==="675980503b55ec4b1208890b");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const socket = io("https://chatbot.pizeonfly.com");

  const location = useLocation();
  const websiteId = location.state?.websiteId;
  console.log(websiteId);
  


  const formatTime = (timestamp) => moment(timestamp).format("h:mm A");
  const formatDate = (timestamp) => moment(timestamp).format("MMMM DD, YYYY");

  useEffect(() => {
    const fetchProperty = async () => {
      
      if (websiteId) {
        try {
          const response = await axios.get(`https://chatbot.pizeonfly.com/api/properties/website/${websiteId}`);
          setProperty(response.data);
          // console.log(response.data);
        } catch (error) {
          console.error('Error fetching property:', error);
        }
      }
    };
    fetchProperty();
  }, [websiteId]);

  useEffect(() => {
    if (!userId || !token) {
      console.error("User ID or Token is missing");
      return;
    }

    socket.emit("join_room", userId, websiteId);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://chatbot.pizeonfly.com/api/messages/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error.response?.data || error);
      }
    };

    fetchMessages();

    socket.on("receive_message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [userId, token, websiteId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Generate a preview for the selected file
      if (selectedFile.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(selectedFile));
      } else if (selectedFile.type.startsWith("video/")) {
        setFilePreview(URL.createObjectURL(selectedFile));
      } else if (selectedFile.type === "application/pdf") {
        setFilePreview("PDF File Selected");
      } else {
        setFilePreview("Unsupported File Type");
      }

      // Open the modal
      setIsModalOpen(true);
    }
  };

  
  const handleSendMessage = async () => {
    if (!message.trim() && !file) {
      console.error("Message content or file is required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("receiverId", adminId);
      if (message.trim()) formData.append("content", message);
      if (file) formData.append("attachment", file);

      const response = await axios.post(
        "https://chatbot.pizeonfly.com/api/message",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newMessage = response.data.message;

      socket.emit("send_message", newMessage);

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
      setFile(null);
      setFilePreview(null);
      setIsModalOpen(false); // Close the modal after sending
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error);
    }
  };

  const closeModal = () => {
    setFile(null);
    setFilePreview(null);
    setIsModalOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((acc, message) => {
      const date = formatDate(message.createdAt);
      if (!acc[date]) acc[date] = [];
      acc[date].push(message);
      return acc;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="h-screen flex bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="w-full flex flex-col bg-white">
        {/* Header */}
        <div className={`bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white`} style={{ 
          background: property?.color || '#3b82f6'
        }}>
          <h1 className="text-xl font-bold">Chat Support</h1>
          <p className="text-blue-100 text-sm">We typically reply within a few minutes</p>
        </div>

        {/* Messages Container */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.97), rgba(255,255,255,.97)), url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        >
          {Object.keys(groupedMessages).map((date, index) => (
            <div key={index} className="space-y-4">
              {/* Date Header */}
              <div className="sticky top-0 z-10 flex justify-center">
                <span className="px-4 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                  {date}
                </span>
              </div>

              {/* Messages */}
              {groupedMessages[date].map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"} message-animation`}
                >
                  <div className={`flex flex-col max-w-[80%] ${msg.senderId === userId ? "items-end" : "items-start"}`}>
                    <div
                      className={`
                        p-3 rounded-2xl shadow-sm
                        ${msg.senderId === userId
                          ? `bg-[${property?.color || '#3b82f6'}] text-white rounded-br-none` 
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }
                      `}
                    >
                      {msg.content && <p className="text-sm leading-relaxed">{msg.content}</p>}
                      
                      {/* Attachments with improved styling */}
                      {msg.attachment && (
                        <div className="mt-2">
                          {msg.attachment.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                            <img
                              src={`https://chatbot.pizeonfly.com${msg.attachment}`}
                              alt="attachment"
                              className="max-w-full rounded-lg hover:opacity-95 transition-opacity cursor-pointer"
                              loading="lazy"
                            />
                          ) : msg.attachment.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video
                              src={`https://chatbot.pizeonfly.com${msg.attachment}`}
                              controls
                              className="max-w-full rounded-lg"
                            />
                          ) : (
                            <a
                              href={`https://chatbot.pizeonfly.com${msg.attachment}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`
                                flex items-center gap-2 text-sm rounded-lg px-3 py-2 transition-colors
                                ${msg.senderId === userId
                                  ? "bg-blue-500 hover:bg-blue-400 text-white"
                                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                }
                              `}
                            >
                              <FaPaperclip className="w-4 h-4" />
                              View Attachment
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-1 px-2">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Message Input - Fixed at bottom */}
        <div className="border-t bg-white p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-4 py-3 bg-gray-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all max-h-32"
                rows="1"
              />
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="fileInput"
                className="p-3 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors"
              >
                <FaPaperclip className="w-5 h-5 text-gray-500" />
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={handleSendMessage}
                className={`p-3 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center group`} style={{ 
                  background: property?.color || '#3b82f6'
                }}
              >
                <FaPaperPlane className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
            <p className="text-xs text-gray-500 font-medium fixed bottom-2 left-32 text-center mt-2">powered by pizeonfly</p>
          </div>
        </div>

        {/* File Preview Modal with improved styling */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Preview Attachment</h2>
                  <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <FaTimes className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  {file.type.startsWith("image/") && (
                    <img src={filePreview} alt="Preview" className="max-w-full rounded-lg" />
                  )}
                  {file.type.startsWith("video/") && (
                    <video src={filePreview} controls className="max-w-full rounded-lg" />
                  )}
                  {file.type === "application/pdf" && (
                    <div className="text-center py-8">
                      <p className="text-gray-600">PDF File Selected</p>
                      <p className="text-sm text-gray-500 mt-1">{file.name}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className={`px-4 py-2 text-white rounded-lg hover:bg-blue-700 transition-colors`} style={{ 
                      background: property?.color || '#3b82f6'
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;


