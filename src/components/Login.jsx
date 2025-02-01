import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';

const Login = () => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState(null); // State to hold location data
  const [property, setProperty] = useState(null); // Add property state
  const navigate = useNavigate();



  const handleSendMessage = () => {
    setShowUserDetails(true);
  };


  useEffect(() => {
    const fetchServices = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const websiteId = urlParams.get("websiteId");

      if (!websiteId) {
        console.error("No website ID provided");
        setErrorMessage("Website ID is missing.");
        return;
      }

      try {
        const response = await axios.get(
          `https://chatbot.pizeonfly.com/api/services/${websiteId}`
        );
        setAvailableServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setErrorMessage("Failed to load services. Please try again later.");
      }
    };

    const fetchProperty = async () => {
      const websiteId = new URLSearchParams(window.location.search).get('websiteId');
      if (websiteId) {
        try {
          const response = await axios.get(`https://chatbot.pizeonfly.com/api/properties/website/${websiteId}`);
          setProperty(response.data);
        } catch (error) {
          console.error('Error fetching property:', error);
        }
      }
    };

    const fetchUserLocation = async () => {
      try {
        const response = await axios.get("https://get.geojs.io/v1/ip/geo.json");

        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        const os = platform || "Unknown OS";
        let browser = "Unknown Browser";

        if (userAgent.includes("Chrome")) {
          browser = "Chrome";
        } else if (userAgent.includes("Safari")) {
          browser = "Safari";
        } else if (userAgent.includes("Firefox")) {
          browser = "Firefox";
        } else if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
          browser = "Internet Explorer";
        } else if (userAgent.includes("Edge")) {
          browser = "Edge";
        }

        const locationData = {
          countryCode: response.data.country_code,
          countryCode3: response.data.country_code3,
          continentCode: response.data.continent_code,
          region: response.data.region,
          city: response.data.city,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          accuracy: response.data.accuracy,
          country: response.data.country,
          timezone: response.data.timezone,
          areaCode: response.data.area_code,
          ip: response.data.ip,
          asn: response.data.asn,
          organization: response.data.organization,
          organizationName: response.data.organization_name,
          os,
          browser,
        };

        setLocation(locationData); // Set the location state with new structure
        // console.log(locationData);
      } catch (error) {
        console.error("Error fetching location:", error);
        setErrorMessage("Failed to fetch location.");
      }
    };



    fetchServices();
    fetchUserLocation(); // Fetch user location on component mount
    fetchProperty(); // Add property fetch
  }, []);


  const handleServiceChange = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };


  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
      setPhoneError(!validatePhone(value) && value ? "Invalid phone number. Must be 10 digits." : "");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value) && value ? "Invalid email address." : "");
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!validatePhone(phone)) {
      setErrorMessage("Invalid phone number. Must be 10 digits.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email address.");
      setLoading(false);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const websiteId = urlParams.get("websiteId");

    if (!websiteId) {
      setErrorMessage("Invalid website ID.");
      setLoading(false);
      return;
    }

    await performLogin(location, websiteId); // Pass location to performLogin
  };

  const performLogin = async (location, websiteId) => {
    try {
      const response = await axios.post("https://chatbot.pizeonfly.com/api/user/auth", {
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
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="mb-6">
      {!showUserDetails && (
        <div className="fixed w-full inset-0 flex items-center justify-center bg-white">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 p-2">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                {property?.logo ? (
                  <img 
                    src={`https://chatbot.pizeonfly.com${property.logo}`}
                    alt={property.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                    <span className="text-black text-4xl font-semibold">
                      {property?.name?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-black mb-2 flex items-center justify-center gap-3">
                  Hi there! <span className="wave-emoji animate-wave">👋</span>
                </h1>
                <p className="text-lg text-black">
                  Welcome to {property?.name || 'our support'}
                </p>
              </div>
            
              <div className="space-y-6 w-full">
                <p className="text-md text-black">
                  Need help? Click below to start a conversation with our support team 😊
                </p>
                
                <button
                  onClick={handleSendMessage}
                  className="w-full bg-gray-200 text-red-500 font-semibold py-2 px-2 rounded-xl 
                    hover:bg-gray-100 transform transition-all duration-200 hover:scale-[1.02]
                    focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 shadow-lg"
                >
                  <div className="flex items-center justify-center gap-3">
                    <FaPaperPlane className="text-xl text-black" />
                    <span className="text-lg text-black">Start Chat</span>
                  </div>
                  <p className="text-sm text-black mt-1">We typically reply within few second</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {showUserDetails && (
        <div className="w-full bg-white overflow-hidden">
          

          {/* Header Section */}
          <div className={`bg-[${property.color || '#3b82f6'}] p-4 text-white`}>
          <div className="flex items-center justify-start mb-4">
            {property?.logo ? (
              <img 
                src={`https://chatbot.pizeonfly.com${property.logo}`}
                alt={property.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-2xl">
                  {property?.name?.charAt(0)?.toUpperCase() || '?'}
                </span>
              </div>
            )}
          </div>
            <h2 className="text-2xl font-bold mb-1">Chat Support {property?.name || 'ChatFlow'}</h2>
            <p className="text-blue-100 text-sm">To connect with the next available agent, please fill out the form provided below.</p>
          </div>

          {/* Form Section */}
          <div className="p-4 ">
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg animate-shake">
                <p className="font-medium">Error</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-1 flex flex-col justify-between">
              {/* Name Input */}
              <div className="space-y-1 ">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaUser className="text-gray-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaEnvelope className="text-gray-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                  required
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaPhone className="text-gray-400" />
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                  required
                />
              </div>

              {/* Services Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Available Services</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableServices.length > 0 ? (
                    availableServices.map((service) => (
                      <label
                        key={service._id}
                        className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${selectedServices.includes(service.name)
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                      >
                        <input
                          type="checkbox"
                          value={service.name}
                          checked={selectedServices.includes(service.name)}
                          onChange={() => handleServiceChange(service.name)}
                          className="hidden"
                        />
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${selectedServices.includes(service.name)
                          ? 'bg-blue-500 text-white'
                          : 'bg-white border border-gray-300'
                          }`}>
                          {selectedServices.includes(service.name) && <FaCheckCircle className="w-3 h-3" />}
                        </div>
                        <span className="text-sm font-medium">{service.name}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm col-span-2">No services available for this website.</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="">
                <button
                  type="submit"
                  className={`w-full mt-1 bg-[${property.color || '#3b82f6'}] text-white py-3 px-6 rounded-xl font-medium 
                hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Start Chatting'
                  )}
                </button>
                
              </div>
            </form>
          </div>
        </div>

      )}

      </div>
      <div className="bg-white z-50 w-full fixed bottom-0 p-2 text-center">
        <a href="https://pizeonfly.com" target="_blank" rel="noopener noreferrer"><p className="text-xs font-medium text-gray-500 cursor-pointer">powered by pizeonfly</p></a>
      </div>
      
    </div>

  );
};

export default Login;