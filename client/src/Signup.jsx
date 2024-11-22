import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import kidsimg from './assets/kids6.jpg';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // Added state for error message
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    if (!name || !email || !password) {
      setError("All fields are required.");
      return false;
    }

    // Email regex for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    // Password length check
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    setError("");  // Clear error if everything is valid
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:3001/register", { name, email, password })
        .then((result) => {
          console.log(result);
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${kidsimg})`
      }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
      <div className="relative bg-white/20 backdrop-blur-md p-8 rounded-lg w-full max-w-md mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
        
        {error && <p className="text-red-600 mb-4">{error}</p>} {/* Display error message */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="w-full px-4 py-2 rounded-lg bg-white/70 text-black"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="w-full px-4 py-2 rounded-lg bg-white/70 text-black"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="w-full px-4 py-2 rounded-lg bg-white/70 text-black"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit" className="w-full py-2 mt-4 rounded-lg bg-red-600 hover:bg-red-700 font-bold">
            Register
          </button>
        </form>
        <p className="mt-6">Already Have an Account?</p>
        <Link
          to="/login"
          className="block w-full py-2 mt-2 text-center rounded-lg bg-gray-100 text-black font-semibold hover:bg-gray-200"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
