import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "./assets/l.png";

const FeedbackDisplay = () => {
  const [feedbackEntries, setFeedbackEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbackEntries();
  }, []);

  const fetchFeedbackEntries = () => {
    // Retrieve the token from localStorage (or sessionStorage, depending on your setup)
    const token = localStorage.getItem("userToken"); // Replace with your storage method if different

    axios
      .get("http://localhost:3001/api/feedback/userFeedback", {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      })
      .then((response) => {
        setFeedbackEntries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching feedback entries:", error);
        setLoading(false);
      });
  };

  const handleEdit = (entry) => {
    navigate("/feedback", { state: { feedbackData: entry } });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/feedback/deleteFeedback/${id}`)
      .then(() => {
        setFeedbackEntries(feedbackEntries.filter((entry) => entry._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting feedback entry:", error);
      });
  };

  if (loading) return <p>Loading feedback...</p>;

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
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-center text-green-400 mb-4">
          Feedback Entries
        </h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto text-white">
          {feedbackEntries.map((entry) => (
            <div key={entry._id} className="border-b border-gray-600 mb-4 pb-4">
              <p>
                <strong>Username:</strong> {entry.username}
              </p>
              <p>
                <strong>Email:</strong> {entry.email}
              </p>
              <p>
                <strong>Experience Rating:</strong> {entry.experienceRating}
              </p>
              <p>
                <strong>Satisfaction Rating:</strong> {entry.satisfactionRating}
              </p>
              <p>
                <strong>Most Useful Aspect:</strong> {entry.usefulFeedback}
              </p>
              <p>
                <strong>Suggestions for Improvement:</strong>{" "}
                {entry.improvementSuggestions}
              </p>
              <p>
                <strong>Recommendation:</strong> {entry.recommendation}
              </p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEdit(entry)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeedbackDisplay;
