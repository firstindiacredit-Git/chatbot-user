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



// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage(""); // Clear previous error messages
//     try {
//       const response = await axios.post("http://localhost:5000/api/user/auth", {
//         name,
//         email,
//         phone,
//       });

//       // Save token and userId to localStorage
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("userId", response.data.userId);

//       // Navigate to chat page
//       navigate("/chat");
//     } catch (error) {
//       // Handle error and show an error message
//       setErrorMessage(
//         error.response?.data?.message || "Error during login. Please try again."
//       );
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div className="w-full max-w-md p-6 justify-center rounded-lg bg-white sm:p-8">
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
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
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


// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [selectedServices, setSelectedServices] = useState([]); // State for selected services
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const services = [
//     "Website Development",
//     "Digital Marketing Training",
//     "Google Ads",
//     "Email Marketing",
//     "Content Writing",
//     "Graphic Designing",
//     "Mobile App Development",
//     "Online Reputation Management",
//     "Search Engine Optimization",
//     "SMM & Account Management",
//     "Video & Animations",
//   ];

//   const handleServiceChange = (service) => {
//     setSelectedServices((prev) =>
//       prev.includes(service)
//         ? prev.filter((s) => s !== service) // Remove if already selected
//         : [...prev, service] // Add if not selected
//     );
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage(""); // Clear previous error messages
//     try {
//       const response = await axios.post("http://localhost:5000/api/user/auth", {
//         name,
//         email,
//         phone,
//         services: selectedServices, // Send selected services to the backend
//       });

//       // Save token and userId to localStorage
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("userId", response.data.userId);

//       // Navigate to chat page
//       navigate("/chat");
//     } catch (error) {
//       // Handle error and show an error message
//       setErrorMessage(
//         error.response?.data?.message || "Error during login. Please try again."
//       );
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div className="w-full max-w-md p-6 justify-center rounded-lg bg-white sm:p-8">
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
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
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

//         <div className="mb-4">
//           <p className="font-semibold mb-2">Select Service(s):</p>
//           {services.map((service) => (
//             <div key={service} className="mb-2">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   value={service}
//                   checked={selectedServices.includes(service)}
//                   onChange={() => handleServiceChange(service)}
//                   className="form-checkbox text-blue-500"
//                 />
//                 <span>{service}</span>
//               </label>
//             </div>
//           ))}
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


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [availableServices, setAvailableServices] = useState([]); // State for available services
//   const [selectedServices, setSelectedServices] = useState([]); // State for selected services
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   // Fetch services based on websiteId from query parameters
//   useEffect(() => {
//     const fetchServices = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const websiteId = urlParams.get('websiteId'); // Get the website ID from the query parameters

//       if (!websiteId) {
//         console.error('No website ID provided');
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:5000/api/services/${websiteId}`);
//         setAvailableServices(response.data); // Set available services based on the website ID
//       } catch (error) {
//         console.error('Error fetching services:', error);
//       }
//     };

//     fetchServices();
//   }, []);

//   const handleServiceChange = (service) => {
//     setSelectedServices((prev) =>
//       prev.includes(service)
//         ? prev.filter((s) => s !== service) // Remove if already selected
//         : [...prev, service] // Add if not selected
//     );
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage(""); // Clear previous error messages
//     const urlParams = new URLSearchParams(window.location.search);
//     const websiteId = urlParams.get('websiteId'); // Get the website ID from the query parameters

//     // Initialize location variable
//     let location = null;

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           location = { latitude, longitude }; // Set location if successful

//           // Proceed with login
//           await performLogin(location, websiteId);
//         },
//         (error) => {
//           // Handle geolocation error
//           console.error("Geolocation error:", error);
//           setErrorMessage("Unable to retrieve your location. You can still log in without location.");
//           // Proceed with login without location
//           performLogin(null, websiteId);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//       setErrorMessage("Geolocation is not supported by this browser. You can still log in without location.");
//       // Proceed with login without location
//       performLogin(null, websiteId);
//     }
//   };

//   const performLogin = async (location, websiteId) => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/user/auth", {
//         name,
//         email,
//         phone,
//         services: selectedServices, // Send selected services to the backend
//         websiteId,
//         location, // Send location data (can be null)
//       });

//       // Save token and userId to localStorage
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("userId", response.data.userId);

//       // Navigate to chat page
//       navigate("/chat");
//     } catch (error) {
//       // Handle error and show an error message
//       setErrorMessage(
//         error.response?.data?.message || "Error during login. Please try again."
//       );
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div className="w-full max-w-md p-6 justify-center rounded-lg bg-white sm:p-8">
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
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
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

//         <div className="mb-4">
//           <p className="font-semibold mb-2">Select Service(s):</p>
//           {availableServices.length > 0 ? (
//             availableServices.map((service) => (
//               <div key={service._id} className="mb-2">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     value={service.name}
//                     checked={selectedServices.includes(service.name)}
//                     onChange={() => handleServiceChange(service.name)}
//                     className="form-checkbox text-blue-500"
//                   />
//                   <span>{service.name}</span>
//                 </label>
//               </div>
//             ))
//           ) : (
//             <p>No services available for this website.</p>
//           )}
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


import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const websiteId = urlParams.get("websiteId");

      if (!websiteId) {
        console.error("No website ID provided");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/services/${websiteId}`);
        setAvailableServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceChange = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const urlParams = new URLSearchParams(window.location.search);
    const websiteId = urlParams.get("websiteId");

    if (!websiteId) {
      setErrorMessage("Invalid website ID.");
      setLoading(false);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await performLogin({ latitude, longitude }, websiteId);
        },
        (error) => {
          console.warn("Geolocation error:", error);
          setErrorMessage("Location access denied. Proceeding without location.");
          performLogin(null, websiteId);
        }
      );
    } else {
      setErrorMessage("Geolocation not supported. Proceeding without location.");
      performLogin(null, websiteId);
    }
  };

  const performLogin = async (location, websiteId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/auth", {
        name,
        email,
        phone,
        services: selectedServices,
        websiteId,
        location,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      navigate("/chat", { state: { websiteId } });
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error.response?.data?.message || "Error during login. Please try again."
      );
    } finally {
      setLoading(false);
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div className="mb-4">
          <p className="font-semibold mb-2">Select Service(s):</p>
          {availableServices.length > 0 ? (
            availableServices.map((service) => (
              <div key={service._id} className="mb-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={service.name}
                    checked={selectedServices.includes(service.name)}
                    onChange={() => handleServiceChange(service.name)}
                    className="form-checkbox text-blue-500"
                  />
                  <span>{service.name}</span>
                </label>
              </div>
            ))
          ) : (
            <p>No services available for this website.</p>
          )}
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



