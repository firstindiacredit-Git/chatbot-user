// import { useState } from "react";
// import axios from "axios";

// const Login = ({ onLoginSuccess }) => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage(""); // Clear previous error messages
//     try {
//       const response = await axios.post("http://localhost:5000/api/user/auth", {
//         name,
//         phone,
//       });

//       // Save token and userId to localStorage
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("userId", response.data.userId);

//       // Notify parent about login success
//       onLoginSuccess();
//     } catch (error) {
//       setErrorMessage(
//         error.response?.data?.message || "Error during login. Please try again."
//       );
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div className="w-full max-w-md p-6 shadow-lg rounded-lg bg-white sm:p-8">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         User Details
//       </h2>

//       {errorMessage && (
//         <div className="mb-4 p-3 text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg">
//           {errorMessage}
//         </div>
//       )}

//       <form onSubmit={handleLogin}>
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Continue"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;



import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear previous error messages
    try {
      const response = await axios.post("http://localhost:5000/api/user/auth", {
        name,
        phone,
      });

      // Save token and userId to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      // Navigate to chat page
      navigate("/chat");
    } catch (error) {
      // Handle error and show an error message
      setErrorMessage(
        error.response?.data?.message || "Error during login. Please try again."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="w-full max-w-md p-6 justify-center rounded-lg bg-white sm:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        User Details
      </h2>

      {errorMessage && (
        <div className="mb-4 p-3 text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Loading..." : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default Login;







