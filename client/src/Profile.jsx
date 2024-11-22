import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiCalendar, FiSettings } from "react-icons/fi";
import logo from "./assets/l.png";
import { Link } from "react-router-dom";
import Sun from "./assets/Sun.svg"; // Import Sun SVG
import Moon from "./assets/Moon.svg"; // Import Moon SVG
import "./DarkMode.css"; // Import CSS
import profile from "./assets/user (1).png";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("userToken");
        console.log(token);
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:3001/userprofile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          localStorage.removeItem("userToken");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  const feedback = [
    { feedback: "Great service!", date: "2024-01-15" },
    { feedback: "Loved the recommendations.", date: "2024-02-20" },
  ];

  const dietPlans = [
    { date: "2024-01-15", description: "High-protein breakfast with fruits." },
    {
      date: "2024-01-16",
      description: "Balanced lunch with veggies and grains.",
    },
  ];

  return (
    <div
      className={`${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-100"
      } min-h-screen`}
    >
      {/* Navbar */}
      <nav
        className={`bg-${
          isDarkMode ? "gray-800" : "white"
        } shadow-md sticky top-0 z-10 p-4`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="VitaGuide Logo"
              className="h-10 w-10 rounded-full shadow-md mr-3"
            />
            <span
              className={`text-3xl font-extrabold ${
                isDarkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              VitaGuide
            </span>
          </Link>
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            {["Home", "About", "Food Sources", "Vitamin Deficiencies"].map(
              (item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(" ", "")}`}
                  className={`font-semibold transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-purple-400"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
                >
                  {item}
                </Link>
              )
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="absolute right-10">
            <img
              src={profile}
              alt="Profile"
              className="rounded-full w-10 h-10 cursor-pointer object-cover border-2 border-purple-200"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <Link
                  to="/home/userprofile"
                  className={`block px-4 py-2 ${
                    isDarkMode
                      ? "text-gray-200 hover:bg-gray-700"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className={`block w-full text-left px-4 py-2 ${
                    isDarkMode
                      ? "text-gray-200 hover:bg-gray-700"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          {/* Dark Mode Toggle Button */}
          <div className="flex items-center">
            <div className="dark_mode">
              <input
                className="dark_mode_input"
                type="checkbox"
                id="darkmode-toggle"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <label className="dark_mode_label" htmlFor="darkmode-toggle">
                <img src={Sun} alt="Sun" className="sun-icon" />
                <img src={Moon} alt="Moon" className="moon-icon" />
              </label>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        } py-12 px-6 lg:px-10`}
      >
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Profile Section */}
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } rounded-3xl shadow-xl p-8`}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
              <img
                src={profile}
                alt="Profile"
                className={`rounded-full w-36 h-36 object-cover border-4 ${
                  isDarkMode ? "border-green-400" : "border-green-300"
                } shadow-md`}
              />
              <div className="mt-4 md:mt-0 text-center md:text-left">
                <h1
                  className={`text-4xl font-bold ${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  } mb-2`}
                >
                  Hello, {userData?.name}!
                </h1>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  } text-lg mb-6`}
                >
                  We’re here to guide you through your child's vitamin journey!
                </p>
                <button
                  onClick={() => navigate("/mail")}
                  className={`px-6 py-3 font-semibold ${
                    isDarkMode ? "bg-green-500" : "bg-green-600"
                  } text-white rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 duration-300`}
                >
                  Send Mail
                </button>
                <button
                  onClick={() => navigate("/personal-details")}
                  className={`ml-4 px-6 py-3 font-semibold ${
                    isDarkMode ? "bg-green-500" : "bg-green-600"
                  } text-white rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 duration-300`}
                >
                  Add Child Detalis
                </button>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } rounded-3xl shadow-xl p-8`}
          >
            <h2
              className={`text-2xl font-bold ${
                isDarkMode ? "text-green-400" : "text-green-600"
              } mb-4`}
            >
              Account Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  } font-semibold`}
                >
                  Username
                </label>
                <p
                  className={`${
                    isDarkMode ? "bg-gray-800" : "bg-green-50"
                  } p-4 rounded-lg`}
                >
                  <div
                    style={{
                      color: isDarkMode ? "#f0f0f0" : "#333333", // Light text color for dark mode, dark text for light mode
                    }}
                  >
                    {userData?.name}
                  </div>
                </p>
              </div>
              <div>
                <label
                  className={`${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  } font-semibold`}
                >
                  Email Address
                </label>
                <p
                  className={`${
                    isDarkMode ? "bg-gray-800" : "bg-green-50"
                  } p-4 rounded-lg`}
                >
                  <div
                    style={{
                      color: isDarkMode ? "#f0f0f0" : "#333333", // Light text color for dark mode, dark text for light mode
                    }}
                  >
                    {userData?.email}
                  </div>
                </p>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } rounded-3xl shadow-xl p-8`}
          >
            <h2
              className={`text-2xl font-bold ${
                isDarkMode ? "text-green-400" : "text-green-600"
              } mb-4`}
            >
              Feedback
            </h2>
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {feedback.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    isDarkMode ? "bg-gray-800" : "bg-green-50"
                  } p-6 rounded-2xl shadow-md w-80 text-center`}
                >
                  <p
                    className={`${
                      isDarkMode ? "text-gray-200" : "text-green-800"
                    } font-medium`}
                  >
                    {item.feedback}
                  </p>
                  <p
                    className={`${
                      isDarkMode ? "text-green-300" : "text-green-600"
                    } text-sm mt-2`}
                  >
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Diet Plan Section */}
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } rounded-3xl shadow-xl p-8`}
          >
            <h2
              className={`text-2xl font-bold ${
                isDarkMode ? "text-green-400" : "text-green-600"
              } mb-4`}
            >
              Diet Plans
            </h2>
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {dietPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`${
                    isDarkMode ? "bg-gray-800" : "bg-green-50"
                  } p-6 rounded-2xl shadow-md w-80 text-center`}
                >
                  <h3
                    className={`${
                      isDarkMode ? "text-gray-200" : "text-green-800"
                    } font-bold text-lg mb-2`}
                  >
                    {plan.date}
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-200" : "text-green-800"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .slider.round {
          border-radius: 34px;
        }
      `}</style>
    </div>
  );
};

export default Profile;
