import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiStar,
  FiThumbsUp,
  FiMessageCircle,
  FiUser,
  FiAlertTriangle,
} from "react-icons/fi";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/feedback/getAllFeedback"
        );
        setFeedbacks(response.data);
      } catch (err) {
        setError("Failed to fetch feedback");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-center">
        <div className="p-6 bg-red-100 border border-red-200 rounded-lg shadow-md">
          <FiAlertTriangle className="h-8 w-8 text-red-600 mb-2" />
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">User Feedback</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((feedback) => (
          <div
            key={feedback._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col min-h-[400px]"
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-full shadow-lg">
                  <FiUser className="h-6 w-6 text-blue-600" />
                </div>
                <div className="truncate">
                  <h3 className="text-lg font-semibold text-white truncate">
                    {feedback.username}
                  </h3>
                  <p className="text-blue-100 text-sm truncate">
                    {feedback.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <FiStar className="text-yellow-400 mr-2" />
                    <span className="text-gray-700 font-medium">
                      Experience Rating:
                    </span>
                    <span className="ml-2 text-gray-900">
                      {feedback.experienceRating}/5
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FiThumbsUp className="text-green-500 mr-2" />
                    <span className="text-gray-700 font-medium">Satisfaction:</span>
                    <span className="ml-2 text-gray-900">
                      {feedback.satisfactionRating}/5
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Feedback
                    </h4>
                    <p className="text-gray-900 whitespace-pre-line">
                      {feedback.usefulFeedback}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Suggestions
                    </h4>
                    <p className="text-gray-900 whitespace-pre-line">
                      {feedback.improvementSuggestions}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center">
                  <FiMessageCircle className="text-blue-500 mr-2" />
                  <span className="text-gray-500">Would recommend:</span>
                  <span className="ml-2 text-gray-900 font-medium">
                    {feedback.recommendation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
