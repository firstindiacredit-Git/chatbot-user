// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import moment from "moment";
// import { FaPaperclip, FaPaperPlane } from "react-icons/fa";

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);

//   const adminId = "675980503b55ec4b1208890b";
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   const socket = io("http://localhost:5000");

//   const formatTime = (timestamp) => moment(timestamp).format("h:mm A");

//   useEffect(() => {
//     if (!userId || !token) {
//       console.error("User ID or Token is missing");
//       return;
//     }

//     // Join user-specific room
//     socket.emit("join_room", userId);

//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/messages/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setMessages(response.data);
//       } catch (error) {
//         console.error("Error fetching messages:", error.response?.data || error);
//       }
//     };

//     fetchMessages();

//     // Listen for real-time messages
//     socket.on("receive_message", (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, [userId, token]);

//   const handleSendMessage = async () => {
//     if (!message.trim()) return;

//     try {
//       const formData = new FormData();
//       formData.append("senderId", userId);
//       formData.append("receiverId", adminId); // Use static admin ID
//       formData.append("content", message);
//       if (file) formData.append("attachment", file);

//       const response = await axios.post("http://localhost:5000/api/message", formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const newMessage = response.data.message;

//       // Emit the message via socket
//       socket.emit("send_message", newMessage);

//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setMessage("");
//       setFile(null);
//     } catch (error) {
//       console.error("Error sending message:", error.response?.data || error);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="chat-container p-4 flex flex-col items-center">
//       <h1 className="text-bold text-xl sm:text-2xl p-2">Chat Support</h1>
//       <div className="messages w-full sm:w-3/4 lg:w-2/3 overflow-y-scroll h-[70vh] border border-gray-300 rounded-lg p-4">
//         {messages.map((msg, index) => (

//           <div
//             key={index}
//             className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"} mb-2`}
//           >
//             <div className="flex flex-col">
//             <div
//               className={`p-3 rounded-lg max-w-xs sm:max-w-sm lg:max-w-md relative ${
//                 msg.senderId === userId
//                   ? "bg-blue-500 text-white self-end"
//                   : "bg-gray-200"
//               }`}
//             >
//              {msg.content && <p>{msg.content}</p>}
//                      {msg.attachment && (
//                        <>
//                         {msg.attachment.endsWith(".jpg") ||
//                            msg.attachment.endsWith(".jpeg") ||
//                            msg.attachment.endsWith(".png") ||
//                           msg.attachment.endsWith(".gif") ? (
//                            <img
//                              src={`http://localhost:5000${msg.attachment}`}
//                              alt="attachment"
//                              className="max-w-full h-auto rounded-md mt-2"
//                            />
//                          ) : msg.attachment.endsWith(".mp4") ||
//                            msg.attachment.endsWith(".webm") ||
//                            msg.attachment.endsWith(".ogg") ? (
//                            <video
//                              src={`http://localhost:5000${msg.attachment}`}
//                              controls
//                              className="max-w-full h-auto rounded-md mt-2"
//                            />
//                          ) : msg.attachment.endsWith(".pdf") ? (
//                            <a
//                              href={`http://localhost:5000${msg.attachment}`}
//                              target="_blank"
//                              rel="noopener noreferrer"
//                              className="text-white-500 underline mt-2"
//                            >
//                              View PDF
//                            </a>
//                         ) : (
//                           <p className="text-gray-500 mt-2">Unsupported file type</p>
//                          )}
//                       </>
//                     )}

//                </div>
//                <div className={`text-xs mt-1 ${msg.senderId === userId ? "text-right" : "text-left"}`}>
//                 {formatTime(msg.createdAt)}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="send-message mt-4 flex items-center gap-2 w-full sm:w-3/4 lg:w-2/3">
//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="w-full flex-grow border border-gray-300 rounded p-2 resize-none"
//           placeholder="Type your message here..."
//         ></textarea>

//         <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" id="fileInput" />
//         <label
//           htmlFor="fileInput"
//           className="cursor-pointer flex-shrink-0 text-gray-700 hover:text-blue-600"
//         >
//           <FaPaperclip size={20} />
//         </label>
//         <button
//           onClick={handleSendMessage}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
//         >
//           <FaPaperPlane size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;







// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import moment from "moment";
// import { FaPaperclip, FaPaperPlane } from "react-icons/fa";

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);

//   const adminId = "675980503b55ec4b1208890b";
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   const socket = io("http://localhost:5000");

//   const formatTime = (timestamp) => moment(timestamp).format("h:mm A");

//   useEffect(() => {
//     if (!userId || !token) {
//       console.error("User ID or Token is missing");
//       return;
//     }

//     socket.emit("join_room", userId);

//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/messages/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setMessages(response.data);
//       } catch (error) {
//         console.error("Error fetching messages:", error.response?.data || error);
//       }
//     };

//     fetchMessages();

//     socket.on("receive_message", (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, [userId, token]);

//   const handleSendMessage = async () => {
//     if (!message.trim()) return;

//     try {
//       const formData = new FormData();
//       formData.append("senderId", userId);
//       formData.append("receiverId", adminId);
//       formData.append("content", message);
//       if (file) formData.append("attachment", file);

//       const response = await axios.post(
//         "http://localhost:5000/api/message",
//         formData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const newMessage = response.data.message;

//       socket.emit("send_message", newMessage);

//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setMessage("");
//       setFile(null);
//     } catch (error) {
//       console.error("Error sending message:", error.response?.data || error);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-0">
//       <div className="bg-white w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] rounded-lg shadow-sm p-4 flex flex-col">
//         <h1 className="text-bold text-xl sm:text-2xl text-center mb-4">
//           Chat Support
//         </h1>

//         <div className="messages h-[60vh] overflow-y-scroll border border-gray-300 rounded-lg p-2 mb-4 break-words">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"
//                 } mb-2`}
//             >
//               <div className="flex flex-col max-w-full">
//                 <div
//                   className={`p-3 rounded-lg max-w-xs sm:max-w-sm lg:max-w-md relative ${msg.senderId === userId
//                     ? "bg-blue-500 text-white self-end"
//                     : "bg-gray-200"
//                     } break-words whitespace-normal`}
//                 >
//                   {msg.content && <p className="break-words">{msg.content}</p>}
//                   {msg.attachment && (
//                     <>
//                       {msg.attachment.endsWith(".jpg") ||
//                         msg.attachment.endsWith(".jpeg") ||
//                         msg.attachment.endsWith(".png") ||
//                         msg.attachment.endsWith(".gif") ? (
//                         <img
//                           src={`http://localhost:5000${msg.attachment}`}
//                           alt="attachment"
//                           className="max-w-full h-auto rounded-md mt-2"
//                         />
//                       ) : msg.attachment.endsWith(".mp4") ||
//                         msg.attachment.endsWith(".webm") ||
//                         msg.attachment.endsWith(".ogg") ? (
//                         <video
//                           src={`http://localhost:5000${msg.attachment}`}
//                           controls
//                           className="max-w-full h-auto rounded-md mt-2"
//                         />
//                       ) : msg.attachment.endsWith(".pdf") ? (
//                         <a
//                           href={`http://localhost:5000${msg.attachment}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-500 underline mt-2"
//                         >
//                           View PDF
//                         </a>
//                       ) : (
//                         <p className="text-gray-500 mt-2">Unsupported file type</p>
//                       )}
//                     </>
//                   )}
//                 </div>
//                 <div
//                   className={`text-xs mt-1 ${msg.senderId === userId ? "text-right" : "text-left"
//                     }`}
//                 >
//                   {formatTime(msg.createdAt)}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="send-message flex items-center gap-2">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="w-full flex-grow border border-gray-300 rounded p-2 resize-y break-words whitespace-normal"
//             placeholder="Type your message here..."
//           ></textarea>

//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="hidden"
//             id="fileInput"
//           />
//           <label
//             htmlFor="fileInput"
//             className="cursor-pointer flex-shrink-0 text-gray-700 hover:text-blue-600"
//           >
//             <FaPaperclip size={20} />
//           </label>
//           <button
//             onClick={handleSendMessage}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
//           >
//             <FaPaperPlane size={20} />
//           </button>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default Chat;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import moment from "moment";
// import { FaPaperclip, FaPaperPlane, FaTimes } from "react-icons/fa";

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);
//   const [filePreview, setFilePreview] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const adminId = "675980503b55ec4b1208890b";
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   const socket = io("http://localhost:5000");

//   const formatTime = (timestamp) => moment(timestamp).format("h:mm A");

//   useEffect(() => {
//     if (!userId || !token) {
//       console.error("User ID or Token is missing");
//       return;
//     }

//     socket.emit("join_room", userId);

//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/messages/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setMessages(response.data);
//       } catch (error) {
//         console.error("Error fetching messages:", error.response?.data || error);
//       }
//     };

//     fetchMessages();

//     socket.on("receive_message", (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, [userId, token]);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);

//       // Generate a preview for the selected file
//       if (selectedFile.type.startsWith("image/")) {
//         setFilePreview(URL.createObjectURL(selectedFile));
//       } else if (selectedFile.type.startsWith("video/")) {
//         setFilePreview(URL.createObjectURL(selectedFile));
//       } else if (selectedFile.type === "application/pdf") {
//         setFilePreview("PDF File Selected");
//       } else {
//         setFilePreview("Unsupported File Type");
//       }

//       // Open the modal
//       setIsModalOpen(true);
//     }
//   };

//   const handleSendMessage = async () => {
//     //if (!message.trim() && !file) return;

//     if (!message.trim() && !file) {
//       console.error("Message content or file is required.");
//       return;
//   }

//     try {
//       const formData = new FormData();
//       formData.append("senderId", userId);
//       formData.append("receiverId", adminId);
//       //formData.append("content", message);
//       if (message.trim()) formData.append("content", message);
//       if (file) formData.append("attachment", file);

//       const response = await axios.post(
//         "http://localhost:5000/api/message",
//         formData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const newMessage = response.data.message;

//       socket.emit("send_message", newMessage);

//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setMessage("");
//       setFile(null);
//       setFilePreview(null);
//       setIsModalOpen(false); // Close the modal after sending
//     } catch (error) {
//       console.error("Error sending message:", error.response?.data || error);
//     }
//   };

//   const closeModal = () => {
//     setFile(null);
//     setFilePreview(null);
//     setIsModalOpen(false);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-0">
//       <div className="bg-white w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] rounded-lg p-4 flex flex-col">
//         <h1 className="text-bold text-xl sm:text-2xl text-center mb-2">
//           Chat Support
//         </h1>

//         <div className="messages h-[60vh] overflow-y-scroll border border-gray-300 rounded-lg p-2 mb-4 break-words">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"
//                 } mb-2`}
//             >
//               <div className="flex flex-col max-w-full">
//                 <div
//                   className={`p-3 rounded-lg max-w-xs sm:max-w-sm lg:max-w-md relative ${msg.senderId === userId
//                     ? "bg-blue-500 text-white self-end"
//                     : "bg-gray-200"
//                     } break-words whitespace-normal`}
//                 >
//                   {msg.content && <p className="break-words">{msg.content}</p>}
//                   {msg.attachment && (
//                     <>
//                       {msg.attachment.endsWith(".jpg") ||
//                       msg.attachment.endsWith(".jpeg") ||
//                       msg.attachment.endsWith(".png") ||
//                       msg.attachment.endsWith(".gif") ? (
//                         <img
//                           src={`http://localhost:5000${msg.attachment}`}
//                           alt="attachment"
//                           className="max-w-full h-auto rounded-md mt-2"
//                         />
//                       ) : msg.attachment.endsWith(".mp4") ||
//                         msg.attachment.endsWith(".webm") ||
//                         msg.attachment.endsWith(".ogg") ? (
//                         <video
//                           src={`http://localhost:5000${msg.attachment}`}
//                           controls
//                           className="max-w-full h-auto rounded-md mt-2"
//                         />
//                       ) : msg.attachment.endsWith(".pdf") ? (
//                         <a
//                           href={`http://localhost:5000${msg.attachment}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-500 underline mt-2"
//                         >
//                           View PDF
//                         </a>
//                       ) : (
//                         <p className="text-gray-500 mt-2">Unsupported file type</p>
//                       )}
//                     </>
//                   )}
//                 </div>
//                 <div
//                   className={`text-xs mt-1 ${msg.senderId === userId ? "text-right" : "text-left"
//                     }`}
//                 >
//                   {formatTime(msg.createdAt)}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="send-message flex items-center gap-2">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="w-full flex-grow border border-gray-300 rounded p-2 resize-y break-words whitespace-normal"
//             placeholder="Type your message here..."
//           ></textarea>

//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="hidden"
//             id="fileInput"
//           />
//           <label
//             htmlFor="fileInput"
//             className="cursor-pointer flex-shrink-0 text-gray-700 hover:text-blue-600"
//           >
//             <FaPaperclip size={20} />
//           </label>
//           <button
//             onClick={handleSendMessage}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
//           >
//             <FaPaperPlane size={20} />
//           </button>
//         </div>
//       </div>

//       {/* Modal for file preview */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-80">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Preview Attachment</h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-red-500">
//                 <FaTimes size={20} />
//               </button>
//             </div>
//             <div className="file-preview mb-4">
//               {file.type.startsWith("image/") && (
//                 <img src={filePreview} alt="Preview" className="max-w-full h-40 rounded-md" />
//               )}
//               {file.type.startsWith("video/") && (
//                 <video src={filePreview} controls className="max-w-full h-40 rounded-md" />
//               )}
//               {file.type === "application/pdf" && <p>PDF File Selected</p>}
//               {!file.type.startsWith("image/") &&
//                 !file.type.startsWith("video/") &&
//                 file.type !== "application/pdf" && (
//                   <p className="text-red-500">Unsupported File Type</p>
//                 )}
//             </div>
//             <div className="flex justify-start gap-2">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSendMessage}
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
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

  const adminId = "675980503b55ec4b1208890b";
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const socket = io("http://localhost:5000");

  const location = useLocation(); // Use useLocation to access state
  const websiteId = location.state?.websiteId; // Retrieve websiteId
  console.log(websiteId);
  


  const formatTime = (timestamp) => moment(timestamp).format("h:mm A");
  const formatDate = (timestamp) => moment(timestamp).format("MMMM DD, YYYY");

  useEffect(() => {
    if (!userId || !token) {
      console.error("User ID or Token is missing");
      return;
    }

    socket.emit("join_room", userId, websiteId);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/${userId}`,
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
        "http://localhost:5000/api/message",
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
    <div className="flex items-center justify-center bg-gray-100 p-0">
      <div className="bg-white w-full max-w-full sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] rounded-lg p-2 h-[76vh] flex flex-col">
        <h1 className="text-bold text-xl sm:text-2xl text-center">
          Chat Support
        </h1>

        <div className="messages w-full h-[75vh] overflow-y-scroll border border-gray-300 rounded-lg p-2 mb-4 break-words">
          {Object.keys(groupedMessages).map((date, index) => (
            <div key={index}>
              <div className="sticky top-0 text-center text-gray-500 text-sm mb-2 py-1 z-10">
                {date}
              </div>
              {groupedMessages[date].map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"
                    } mb-2`}
                >
                  <div className="flex flex-col max-w-full">
                    <div
                      className={`p-3 rounded-lg max-w-xs sm:max-w-sm lg:max-w-md relative ${msg.senderId === userId
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-200"
                        } break-words whitespace-normal`}
                    >
                      {msg.content && <p className="break-words">{msg.content}</p>}
                      {msg.attachment && (
                        <>
                          {msg.attachment.endsWith(".jpg") ||
                          msg.attachment.endsWith(".jpeg") ||
                          msg.attachment.endsWith(".png") ||
                          msg.attachment.endsWith(".gif") ? (
                            <img
                              src={`http://localhost:5000${msg.attachment}`}
                              alt="attachment"
                              className="max-w-full h-auto rounded-md mt-2"
                            />
                          ) : msg.attachment.endsWith(".mp4") ||
                            msg.attachment.endsWith(".webm") ||
                            msg.attachment.endsWith(".ogg") ? (
                            <video
                              src={`http://localhost:5000${msg.attachment}`}
                              controls
                              className="max-w-full h-auto rounded-md mt-2"
                            />
                          ) : msg.attachment.endsWith(".pdf") ? (
                            <a
                              href={`http://localhost:5000${msg.attachment}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline mt-2"
                            >
                              View PDF
                            </a>
                          ) : (
                            <p className="text-gray-500 mt-2">Unsupported file type</p>
                          )}
                        </>
                      )}
                    </div>
                    <div
                      className={`text-xs mt-1 ${msg.senderId === userId ? "text-right" : "text-left"
                        }`}
                    >
                      {formatTime(msg.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="send-message flex items-center gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full flex-grow border border-gray-300 rounded p-2 resize-y break-words whitespace-normal"
            placeholder="Type your message here..."
          ></textarea>

          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Preview Attachment</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-red-500">
                <FaTimes size={20} />
              </button>
            </div>
            <div className="file-preview mb-4">
              {file.type.startsWith("image/") && (
                <img src={filePreview} alt="Preview" className="max-w-full h-40 rounded-md" />
              )}
              {file.type.startsWith("video/") && (
                <video src={filePreview} controls className="max-w-full h-40 rounded-md" />
              )}
              {file.type === "application/pdf" && <p>PDF File Selected</p>}
              {!file.type.startsWith("image/") &&
                !file.type.startsWith("video/") &&
                file.type !== "application/pdf" && (
                  <p className="text-red-500">Unsupported File Type</p>
                )}
            </div>
            <div className="flex justify-start gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
















































