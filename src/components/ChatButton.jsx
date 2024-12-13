// import React, { useState } from "react";
// import Login from "./Login"; // Adjust the path to your Login.jsx file

// const ChatButton = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const togglePopup = () => {
//     setIsPopupOpen(!isPopupOpen);
//   };

//   return (
//     <div>
//       {/* Chat Button */}
//       {!isPopupOpen && (
//         <button
//           onClick={togglePopup}
//           className="fixed bottom-4 right-4 flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors shadow-md"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="white"
//             viewBox="0 0 24 24"
//             width="24"
//             height="24"
//             className="text-white"
//           >
//             <path d="M12 2C6.48 2 2 6.02 2 11c0 2.38 1.2 4.57 3.23 6.12L4 21l4.25-2.43C9.18 18.8 10.55 19 12 19c5.52 0 10-4.02 10-9S17.52 2 12 2zm0 14c-1.26 0-2.47-.27-3.57-.77l-.43-.21L6 16.23l.85-2.22-.36-.38C5.16 12.46 4.5 11.34 4.5 11c0-3.04 3.14-5.5 7-5.5s7 2.46 7 5.5-3.14 5.5-7 5.5z" />
//           </svg>
//         </button>
//       )}

//       {/* Popup for Login */}
//       {isPopupOpen && (
//         <div className="fixed bottom-0 right-0 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-md h-[90vh] p-6 rounded-lg shadow-lg relative flex flex-col">
//             {/* Close Button */}
//             <button
//               onClick={togglePopup}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
//             >
//               &times;
//             </button>

//             {/* Login Component */}
//             <div className="flex-grow flex items-center justify-center">
//               <Login />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatButton;


import React, { useState } from "react";
import Login from "./Login"; // Adjust the path to your Login.jsx file
import Chat from "./Chat"; // Adjust the path to your Chat.jsx file

const ChatButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Set logged-in state to true
  };

  return (
    <div>
      {/* Chat Button */}
      {!isPopupOpen && (
        <button
          onClick={togglePopup}
          className="fixed bottom-4 right-4 flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-white"
          >
            <path d="M12 2C6.48 2 2 6.02 2 11c0 2.38 1.2 4.57 3.23 6.12L4 21l4.25-2.43C9.18 18.8 10.55 19 12 19c5.52 0 10-4.02 10-9S17.52 2 12 2zm0 14c-1.26 0-2.47-.27-3.57-.77l-.43-.21L6 16.23l.85-2.22-.36-.38C5.16 12.46 4.5 11.34 4.5 11c0-3.04 3.14-5.5 7-5.5s7 2.46 7 5.5-3.14 5.5-7 5.5z" />
          </svg>
        </button>
      )}

      {/* Popup for Login or Chat */}
      {isPopupOpen && (
        <div className="fixed bottom-0 right-0 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-xl h-[90vh] p-6 rounded-lg shadow-lg relative flex flex-col">
            {/* Close Button */}
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Conditionally Render Login or Chat */}
            <div className="flex-grow flex items-center justify-center">
              {isLoggedIn ? <Chat /> : <Login onLoginSuccess={handleLoginSuccess} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
