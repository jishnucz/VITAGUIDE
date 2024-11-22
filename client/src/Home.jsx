import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/l.png";
import bg from "./assets/bg.jpg";
import vitamin from "./assets/file.png";
import pd from "./assets/pd.jpg";
import vd from "./assets/vd.jpg";
import qz from "./assets/qz.jpg";
import fb from "./assets/fb.svg";
import twitter from "./assets/twitter.svg";
import instagram from "./assets/instagram.svg";
import linkedin from "./assets/linkedin.svg";
import profile from "./assets/user (1).png";
import { Navigate } from "react-router-dom";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = localStorage.getItem("userToken")

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  if (!token) {
    return <Navigate to="/signup" />;
  }

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="" className="flex items-center">
            <img src={logo} alt="VitaGuide Logo" className="h-10 mr-3" />
            <span className="text-2xl font-bold text-gray-800">VitaGuide</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link
              to="/home"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </Link>
            <Link
              to="/foodsources"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Food Sources
            </Link>
            <Link
              to="/symptomslist"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Vitamin Deficiencies
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
            >
              <img
                src={profile} // Add default profile image if none exists
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-20">
                <ul className="py-2">
                  <li>
                    <Link
                      to="/home/userprofile"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-gray-800 hover:bg-blue-100 text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="hero-section flex items-center justify-center text-center h-screen bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg})`,
        }}
      >
        <div className="max-w-3xl px-8">
          <h1 className="text-5xl font-bold mb-4">
            Empowering Parents with Nutritional Insights
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            VitaGuide helps you personalize your child’s nutrition and health
            needs with expert-driven insights.
          </p>
          <Link
            to="#feature"
            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 mt-16" id="feature">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          Explore VitaGuide Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Food Sources Card */}
          <div className="flex flex-col items-center bg-gradient-to-r from-green-50 via-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
            <img
              src={pd}
              alt="Food Sources"
              className="w-32 h-32 mb-6 rounded-full shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
            />
            <h3 className="text-2xl font-semibold text-blue-900 mb-3">
              Food Sources
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Discover essential vitamin-rich foods to support your child’s
              health and well-being.
            </p>
            <Link
              to="/foodsources"
              className="mt-4 bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Learn More
            </Link>
          </div>

          {/* Vitamin Deficiencies Card */}
          <div className="flex flex-col items-center bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
            <img
              src={vd}
              alt="Vitamin Deficiencies"
              className="w-32 h-32 mb-6 rounded-full shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
            />
            <h3 className="text-2xl font-semibold text-blue-900 mb-3">
              Vitamin Deficiencies
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Discover possible vitamin deficiencies and get dietary advice to
              address them.
            </p>
            <Link
              to="/symptomslist"
              className="mt-4 bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Explore
            </Link>
          </div>

          {/* Quizzes Card */}
          <div className="flex flex-col items-center bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
            <img
              src={qz}
              alt="Quizzes"
              className="w-32 h-32 mb-6 rounded-full shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
            />
            <h3 className="text-2xl font-semibold text-blue-900 mb-3">
              Engaging Quizzes
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Test your knowledge on health and nutrition through fun,
              interactive quizzes.
            </p>
            <Link
              to="/quiz"
              className="mt-4 bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Take a Quiz
            </Link>
          </div>
        </div>
      </section>
      <br /><br /> <br /><br /><br /><br /><br /><br />

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="container mx-auto px-4 text-center">
          {/* Logo and Description */}
          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <img src={logo} alt="VitaGuide Logo" className="h-12 mr-3" />
              <span className="text-2xl font-semibold text-white">VitaGuide</span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering parents with the best insights on children's nutrition
              and health.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <img src={fb} alt="Facebook" className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <img src={instagram} alt="Instagram" className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <img src={linkedin} alt="LinkedIn" className="w-6 h-6" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <img src={twitter} alt="Twitter" className="w-6 h-6" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500 mb-4">
            <p>&copy; {new Date().getFullYear()} VitaGuide. All rights reserved.</p>
          </div>

          {/* Feedback Button */}
          <Link
            to="/feedback"
            className="bg-blue-600 text-white text-center py-4 px-8 rounded-full fixed bottom-8 right-8 shadow-xl hover:bg-blue-700 transition duration-300"
          >
            Feedback
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Home;
