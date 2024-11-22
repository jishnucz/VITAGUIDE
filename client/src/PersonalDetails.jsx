import React, { useState, useEffect } from "react";
import axios from "axios";

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    birthdate: "",
    gender: "",
    pinCode: "",
    city: "",
    state: "",
    phoneNumber: "",
    anotherPhone: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Append form data fields
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/personal-details",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show a success message if submission was successful
      alert("Personal details saved successfully!");
    } catch (error) {
      console.error(
        "Error submitting personal details:",
        error.response || error
      );

      // Display an error message based on server response or fallback to a generic error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message); // Server error message
      } else {
        alert("An error occurred while submitting the form. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center min-h-screen p-4 ">
      <div className="details-form w-full max-w-3xl bg-gray-900 p-8 rounded-lg shadow-lg text-white">
        <h2 className="text-3xl font-bold text-green-500 text-center mb-4">
          Child's Personal Details
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Please fill in the child's information for the Vitamin Deficiency Web
          Application.
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          method="POST"
          encType="multipart/form-data"
        >
          {/* Profile Picture Upload */}
          <div className="flex justify-center mb-6">
            <div className="relative w-36 h-36">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="rounded-full w-full h-full object-cover border-4 border-green-500"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/150"
                  alt="Placeholder"
                  className="rounded-full w-full h-full object-cover border-4 border-green-500"
                />
              )}
              <label className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full cursor-pointer">
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  required
                  className="hidden"
                  accept="image/jpeg, image/png"
                />
                <img
                  src="https://img.icons8.com/ios-filled/24/ffffff/upload.png"
                  alt="Upload"
                />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label text-gray-400">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 rounded bg-gray-800 text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label className="form-label text-gray-400">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 rounded bg-gray-800 text-white placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="form-label text-gray-400">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 rounded bg-gray-800 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="form-label text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 rounded bg-gray-800 text-white placeholder-gray-500"
            />
          </div>

          {/* Birthdate and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="birthdate" className="form-label text-gray-400">
                Birthdate
              </label>
              <input
                type="date"
                name="birthdate"
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 rounded bg-gray-800 text-white"
              />
            </div>
            <div>
              <label className="form-label text-gray-400">Gender</label>
              <div className="flex items-center space-x-4 mt-1">
                <label className="flex items-center text-sm text-gray-300">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center text-sm text-gray-300">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="flex items-center text-sm text-gray-300">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Other
                </label>
              </div>
            </div>
          </div>

          {/* Pincode, City, State */}
          <div>
            <label htmlFor="pincode" className="form-label text-gray-400">
              Pin-Code
            </label>
            <input
              type="text"
              name="pinCode"
              placeholder="Example: 239956"
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 rounded bg-gray-800 text-white placeholder-gray-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="form-label text-gray-400">
                City
              </label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-gray-800 text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label htmlFor="state" className="form-label text-gray-400">
                State
              </label>
              <input
                type="text"
                name="state"
                placeholder="Enter your state"
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-gray-800 text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="phoneNumber1"
                className="form-label text-gray-400"
              >
                Phone Number 1
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter primary phone number"
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 rounded bg-gray-800 text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber2"
                className="form-label text-gray-400"
              >
                Phone Number 2
              </label>
              <input
                type="text"
                name="anotherPhone"
                placeholder="Enter secondary phone number"
                onChange={handleChange}
                className="w-full p-2 mt-1 rounded bg-gray-800 text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn w-full py-3 mt-4 bg-green-500 hover:bg-green-600 rounded text-white text-lg font-semibold"
          >
            Submit Child's Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;
