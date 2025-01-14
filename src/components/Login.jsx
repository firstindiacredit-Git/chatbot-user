import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaCheckCircle } from 'react-icons/fa';

const Login = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState(null); // State to hold location data
  const navigate = useNavigate();

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
        console.log(locationData);
      } catch (error) {
        console.error("Error fetching location:", error);
        setErrorMessage("Failed to fetch location.");
      }
    };
    
    

    fetchServices();
    fetchUserLocation(); // Fetch user location on component mount
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="w-full bg-white overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
          <h2 className="text-2xl font-bold mb-1">Welcome to ChatFlow</h2>
          <p className="text-blue-100 text-sm">Please enter your details to get started</p>
        </div>

        {/* Form Section */}
        <div className="p-4">
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg animate-shake">
              <p className="font-medium">Error</p>
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-1">
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPhone(e.target.value)}
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
                      className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                        selectedServices.includes(service.name)
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
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        selectedServices.includes(service.name)
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
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-medium 
                hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-blue-500/25"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;