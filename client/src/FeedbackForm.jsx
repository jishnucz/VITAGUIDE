import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "./assets/l.png";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    experienceRating: "",
    satisfactionRating: "",
    usefulFeedback: "",
    improvementSuggestions: "",
    recommendation: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const feedbackData = location.state?.feedbackData;

  useEffect(() => {
    if (feedbackData) {
      setFormData(feedbackData);
    }
  }, [feedbackData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (
      formData.username.length < 5 ||
      !formData.username.match(/^[a-zA-Z0-9,@,#,$,%]+$/)
    ) {
      errors.username =
        "Username must be at least 5 characters and can include letters, numbers, and symbols (@, #, $, %).";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Retrieve token from localStorage (or any other secure storage location)
      const token = localStorage.getItem("userToken");

      // Set the API endpoint and method based on whether feedbackData exists
      const apiEndpoint = feedbackData
        ? `http://localhost:3001/api/feedback/updateFeedback/${feedbackData._id}`
        : "http://localhost:3001/api/feedback/submitFeedback";
      const apiMethod = feedbackData ? axios.put : axios.post;

      // Request configuration with the Authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to the header
        },
      };

      // Make the API call with the formData and configuration
      apiMethod(apiEndpoint, formData, config)
        .then(() => {
          alert(
            feedbackData
              ? "Feedback Updated Successfully!"
              : "Feedback Submitted Successfully!"
          );
          navigate("/feedbackdisplay");
        })
        .catch((error) => {
          if (error.response && error.response.data.errors) {
            setFormErrors(error.response.data.errors);
          } else {
            console.error("There was an error submitting the feedback!", error);
          }
        });
    }
  };

  return (
    <>
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
              to="/services"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Services
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>
      <div className="min-h-screen flex items-center justify-center font-sans">
        <div className="bg-gray-900 p-8 rounded-lg max-w-lg w-full shadow-lg">
          <h2 className="text-4xl font-bold text-green-500 text-center mb-6">
            {feedbackData ? "Edit Feedback" : "Submit Feedback"}
          </h2>
          <p className="text-center text-gray-400 mb-8">
            We value your feedback! Please take a moment to share your
            experience.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {formErrors.username && (
                <p className="text-red-500 text-sm">{formErrors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-white" htmlFor="experienceRating">
                How would you rate your overall experience with the web
                application?
              </label>
              <select
                id="experienceRating"
                value={formData.experienceRating}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="1">1 - Very Poor</option>
                <option value="2">2 - Poor</option>
                <option value="3">3 - Fair</option>
                <option value="4">4 - Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>

            <div>
              <label className="block text-white" htmlFor="satisfactionRating">
                How satisfied are you with the accuracy of the vitamin
                recommendations?
              </label>
              <select
                id="satisfactionRating"
                value={formData.satisfactionRating}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="1">1 - Very Dissatisfied</option>
                <option value="2">2 - Dissatisfied</option>
                <option value="3">3 - Neutral</option>
                <option value="4">4 - Satisfied</option>
                <option value="5">5 - Very Satisfied</option>
              </select>
            </div>

            <div>
              <label htmlFor="usefulFeedback" className="block text-white">
                Most Useful Aspect:
              </label>
              <input
                type="text"
                id="usefulFeedback"
                value={formData.usefulFeedback}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label
                htmlFor="improvementSuggestions"
                className="block text-white"
              >
                Suggestions for Improvement:
              </label>
              <textarea
                id="improvementSuggestions"
                value={formData.improvementSuggestions}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div>
              <label htmlFor="recommendation" className="block text-white">
                Would you recommend this web application to others?
              </label>
              <input
                type="radio"
                id="recommendation"
                name="recommendation"
                value="yes"
                checked={formData.recommendation === "yes"} // Check if 'yes' is selected
                onChange={handleChange}
                className="p-1 form-radio text-blue-500"
                required
              />
              <label htmlFor="recommendYes" className="ml-2 p-1 text-white">
                Yes
              </label>
              <input
                type="radio"
                id="recommendation"
                name="recommendation"
                value="no"
                checked={formData.recommendation === "no"} // Check if 'no' is selected
                onChange={handleChange}
                className="p-1 form-radio text-red-500"
                required
              />
              <label htmlFor="recommendNo" className="ml-2 p-1 text-white">
                No
              </label>
            </div>
            {formErrors.recommendation && (
              <p className="text-red-500 text-sm">
                {formErrors.recommendation}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition duration-300"
            >
              {feedbackData ? "Update Feedback" : "Submit Feedback"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
