import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const adminId = "675980503b55ec4b1208890b";
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const socket = io("http://localhost:5000");

  useEffect(() => {
    if (!userId || !token) {
      console.error("User ID or Token is missing");
      return;
    }

    // Join user-specific room
    socket.emit("join_room", userId);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/messages/${userId}`, {
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

      const response = await axios.post("http://localhost:5000/api/message", formData, {
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

  return (
    <div className="chat-container p-4">
      <div className="messages overflow-y-scroll h-[70vh] border border-gray-300 rounded-lg p-4">
        {messages.map((msg, index) => (
          <div key={index} className="message my-2">
            <div className={`p-2 rounded ${msg.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              {msg.content}
            </div>
            {msg.attachment && (
              <a href={`http://localhost:5000${msg.attachment}`} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                View Attachment
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="send-message mt-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Type your message here..."
        ></textarea>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mt-2 block" />

        <button onClick={handleSendMessage} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;



































// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import moment from "moment";
// import { FaPaperclip, FaPaperPlane } from "react-icons/fa";

// const Chat = () => {
//   cconst [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   // const userId = localStorage.getItem("userId");
//   // const adminId = "admin_static_id";
//   // const socketRef = useRef(null);
//   // const messagesEndRef = useRef(null);


//   const adminId = "675980503b55ec4b1208890b"; // Static admin ID
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const formatTime = (timestamp) => moment(timestamp).format("h:mm A");


//   useEffect(() => {
//     if (!userId || !token) {
//       setError("User authentication required");
//       return;
//     }

//     // Initialize socket
//     socketRef.current = io("http://localhost:5000");
//     socketRef.current.emit("register", userId);

//     const fetchMessages = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:5000/api/messages/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setMessages(response.data);
//         scrollToBottom();
//       } catch (err) {
//         setError("Failed to fetch messages");
//         console.error("Message fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();

//     // Prevent multiple event listeners
//     if (!socketListenersRef.current) {
//       socketListenersRef.current = true;

//       socketRef.current.on("receive_message", (newMessage) => {
//         if (newMessage.senderId === adminId || newMessage.receiverId === userId) {
//           setMessages((prevMessages) => {
//             if (!prevMessages.some((msg) => msg._id === newMessage._id)) {
//               return [...prevMessages, newMessage];
//             }
//             return prevMessages;
//           });
//           scrollToBottom();
//         }
//       });
//     }

//     return () => {
//       socketRef.current?.disconnect();
//       socketListenersRef.current = false; // Reset listener state
//     };
//   }, [userId, token]);


//   const handleSendMessage = async () => {
//     if (!message.trim() && !file) {
//       setError("Message or file is required");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("senderId", userId);
//       formData.append("receiverId", adminId);
//       formData.append("content", message);
//       if (file) formData.append("attachment", file);

//       const response = await axios.post("http://localhost:5000/api/message", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const newMessage = response.data.message;

//       // Send message via socket only once
//       socketRef.current.emit("send_message", {
//         senderId: userId,
//         receiverId: adminId,
//         content: newMessage.content,
//         attachment: newMessage.attachment,
//         _id: newMessage._id, // Include unique ID for deduplication
//       });

//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       scrollToBottom();

//       setMessage("");
//       setFile(null);
//       setPreview(null);
//       setError(null);
//     } catch (err) {
//       setError("Failed to send message");
//       console.error("Message send error:", err);
//     }
//   };


//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);

//     if (selectedFile) {
//       const reader = new FileReader();
//       reader.onload = () => setPreview(reader.result);
//       reader.readAsDataURL(selectedFile);
//     } else {
//       setPreview(null);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="flex items-center justify-center bg-gray-100">
//       <div className="chat-container p-4 bg-white shadow-sm rounded-lg w-full sm:max-w-sm md:max-w-md lg:max-w-lg h-full sm:h-[85vh]">
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
//             {error}
//           </div>
//         )}
//         <h1 className="text-bold text-xl sm:text-2xl p-2">Chat Support</h1>
//         <div className="messages overflow-y-scroll h-[65vh] border border-gray-300 rounded-lg p-4 mb-4">
//           {loading ? (
//             <div className="text-center">Loading messages...</div>
//           ) : (
//             messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex w-full ${msg.senderId === userId ? "justify-end" : "justify-start"} mb-2`}
//               >
//                 <div className="flex flex-col w-full max-w-[90%] sm:max-w-[75%] lg:max-w-[60%]">
//                   <div
//                     className={`inline-block p-2 rounded-lg ${msg.senderId === userId
//                       ? "bg-blue-500 text-white self-end"
//                       : "bg-gray-200 text-black self-start"
//                       }`}
//                   >
//                     {msg.content && <p>{msg.content}</p>}
//                     {msg.attachment && (
//                       <>
//                         {msg.attachment.endsWith(".jpg") ||
//                           msg.attachment.endsWith(".jpeg") ||
//                           msg.attachment.endsWith(".png") ||
//                           msg.attachment.endsWith(".gif") ? (
//                           <img
//                             src={`http://localhost:5000${msg.attachment}`}
//                             alt="attachment"
//                             className="max-w-full h-auto rounded-md mt-2"
//                           />
//                         ) : msg.attachment.endsWith(".mp4") ||
//                           msg.attachment.endsWith(".webm") ||
//                           msg.attachment.endsWith(".ogg") ? (
//                           <video
//                             src={`http://localhost:5000${msg.attachment}`}
//                             controls
//                             className="max-w-full h-auto rounded-md mt-2"
//                           />
//                         ) : msg.attachment.endsWith(".pdf") ? (
//                           <a
//                             href={`http://localhost:5000${msg.attachment}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-white-500 underline mt-2"
//                           >
//                             View PDF
//                           </a>
//                         ) : (
//                           <p className="text-gray-500 mt-2">Unsupported file type</p>
//                         )}
//                       </>
//                     )}
//                   </div>
//                   <div
//                     className={`text-xs mt-1 ${msg.senderId === userId ? "text-right" : "text-left"}`}
//                   >
//                     {formatTime(msg.createdAt)}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//           <div ref={messagesEndRef} />
//         </div>



//         <div className="send-message flex items-center gap-2">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="flex-grow border border-gray-300 rounded p-2"
//             placeholder="Type your message here..."
//             rows={1}
//           />
//           <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
//           <label
//             htmlFor="fileInput"
//             className="cursor-pointer flex-shrink-0 text-gray-700 hover:text-blue-600"
//           >
//             <FaPaperclip size={20} />
//           </label>
//           <button
//             onClick={handleSendMessage}
//             disabled={loading}
//             className={`flex-shrink-0 bg-blue-500 text-white p-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
//               }`}
//           >
//             <FaPaperPlane size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;


















// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import moment from "moment";
// import { FaPaperclip, FaPaperPlane } from "react-icons/fa";

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const adminId = "675980503b55ec4b1208890b";
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const formatTime = (timestamp) => moment(timestamp).format("h:mm A");

//   // useEffect(() => {
//   //   if (!userId || !token) {
//   //     setError("User authentication required");
//   //     return;
//   //   }

//   //   socketRef.current = io("http://localhost:5000");
//   //   socketRef.current.emit("register", userId);

//   //   const fetchMessages = async () => {
//   //     try {
//   //       setLoading(true);
//   //       const response = await axios.get(`http://localhost:5000/api/messages/${userId}`, {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       });
//   //       setMessages(response.data);
//   //       scrollToBottom();
//   //     } catch (err) {
//   //       setError("Failed to fetch messages");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchMessages();

//   //   socketRef.current.on("receive_message", (newMessage) => {
//   //     setMessages((prevMessages) => [...prevMessages, newMessage]);
//   //     scrollToBottom();
//   //   });

//   //   return () => {
//   //     socketRef.current?.disconnect();
//   //   };
//   // }, [userId, token]);



//   useEffect(() => {

//     if (!userId || !token) {
//       setError("User authentication required");
//       return;
//     }
  
//     const socket = io("http://localhost:5000");

//     socket.emit("register", userId);
//     socketRef.current = socket;

//     const fetchMessages = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:5000/api/messages/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // Ensure no duplicates while fetching
//         const uniqueMessages = response.data.filter(
//           (msg, index, self) => self.findIndex((m) => m._id === msg._id) === index
//         );
//         setMessages(uniqueMessages);
//         scrollToBottom();
//       } catch (err) {
//         setError("Failed to fetch messages");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();

//     socketRef.current.on("receive_message", (newMessage) => {
//       setMessages((prevMessages) => {
//         // Check for duplicate `_id`
//         if (!prevMessages.some((msg) => msg._id === newMessage._id)) {
//           return [...prevMessages, newMessage];
//         }
//         return prevMessages;
//       });
//       scrollToBottom();
//     });

//     return () => {
//       socketRef.current?.disconnect();
//     };
//   }, [userId, token]);


//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);

//     if (selectedFile) {
//       const reader = new FileReader();
//       reader.onload = () => setPreview(reader.result);
//       reader.readAsDataURL(selectedFile);
//     } else {
//       setPreview(null);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!message.trim() && !file) {
//       setError("Message or file is required");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("senderId", userId);
//       formData.append("receiverId", adminId);
//       formData.append("content", message);
//       if (file) formData.append("attachment", file);

//       const response = await axios.post("http://localhost:5000/api/message", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const newMessage = response.data.message;

//       // Emit the message through socket
//       socketRef.current.emit("send_message", newMessage);

//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       scrollToBottom();

//       setMessage("");
//       setFile(null);
//       setPreview(null);
//       setError(null);
//     } catch (err) {
//       setError("Failed to send message");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="flex items-center justify-center bg-gray-100">
//       <div className="chat-container p-4 bg-white shadow-sm rounded-lg w-full sm:max-w-sm md:max-w-md lg:max-w-lg h-full sm:h-[85vh]">
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
//             {error}
//           </div>
//         )}
//         <h1 className="text-bold text-xl sm:text-2xl p-2">Chat Support</h1>
//         <div className="messages overflow-y-scroll h-[65vh] border border-gray-300 rounded-lg p-4 mb-4">
//           {loading ? (
//             <div className="text-center">Loading messages...</div>
//           ) : (
//             messages.map((msg) => (
//               <div
//                 key={msg._id}
//                 className={`flex w-full ${msg.senderId === userId ? "justify-end" : "justify-start"} mb-2`}
//               >
//                 <div className="flex flex-col w-full max-w-[90%] sm:max-w-[75%] lg:max-w-[60%]">
//                   <div
//                     className={`inline-block p-2 rounded-lg ${msg.senderId === userId
//                       ? "bg-blue-500 text-white self-end"
//                       : "bg-gray-200 text-black self-start"
//                       }`}
//                   >
//                     {msg.content && <p>{msg.content}</p>}
//                     {msg.attachment && <img src={`http://localhost:5000${msg.attachment}`} alt="attachment" />}
//                   </div>
//                   <div
//                     className={`text-xs mt-1 ${msg.senderId === userId ? "text-right" : "text-left"}`}
//                   >
//                     {formatTime(msg.createdAt)}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         <div className="send-message flex items-center gap-2">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="flex-grow border border-gray-300 rounded p-2"
//             placeholder="Type your message here..."
//             rows={1}
//           />
//           <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
//           <label
//             htmlFor="fileInput"
//             className="cursor-pointer flex-shrink-0 text-gray-700 hover:text-blue-600"
//           >
//             <FaPaperclip size={20} />
//           </label>
//           <button
//             onClick={handleSendMessage}
//             disabled={loading}
//             className={`flex-shrink-0 bg-blue-500 text-white p-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
//               }`}
//           >
//             <FaPaperPlane size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
