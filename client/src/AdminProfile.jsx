import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiCalendar, FiSettings } from "react-icons/fi";
import FeedbackList from "./FeedbackList";
import { Link } from 'react-router-dom';
import logo from './assets/l.png';

const AdminProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:3001/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          localStorage.removeItem("token");
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

 

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
    <nav className="bg-white shadow-md sticky top-0 z-10 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="" className="flex items-center">
          <img src={logo} alt="VitaGuide Logo" className="h-10 mr-3" />
          <span className="text-2xl font-bold text-gray-800">VitaGuide</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-cyan-600 px-8 py-10 text-white">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full shadow-md">
                <FiUser className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold">{userData?.name}</h1>
                <p className="text-blue-100 font-medium">Administrator</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all">
              <FiMail className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-lg font-semibold text-gray-900 break-words">
                  {userData?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all">
              <FiCalendar className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(userData?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

           
            {/* New buttons for navigation */}
            <div className="mt-6 space-y-4">
              <button
                onClick={() => navigate("/admindashboard")}
                className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 shadow-sm transition-transform transform hover:scale-105"
              >
                Go to Admin Dashboard
              </button>
              <button
                onClick={() => navigate("/adminpage")}
                className="w-full px-4 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 shadow-sm transition-transform transform hover:scale-105"
              >
                Go to Admin Page
              </button>
            </div>

            <div className="mt-10">
              <FeedbackList />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminProfile;
