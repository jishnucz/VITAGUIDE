import React, { useState } from "react";
import axios from "axios";

function EmailSender() {
  const [email, setEmail] = useState("");
  const [vitamin, setVitamin] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Simple email validation function
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const sendEmail = async () => {
    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!vitamin) {
      setMessage("Please select a vitamin.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3001/send-email", {
        email,
        vitamin,
      });
      setMessage(response.data.message || "Diet plan sent successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to send email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Get Your Personalized Diet Plan</h2>
        <p style={styles.description}>
          Enter your email and select a vitamin to receive a tailored diet plan
          from <strong>VitaGuide</strong>.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <select
          value={vitamin}
          onChange={(e) => setVitamin(e.target.value)}
          style={styles.select}
        >
          <option value="" disabled>
            Select a Vitamin
          </option>
          <option value="Vitamin A">Vitamin A</option>
          <option value="Vitamin B1">Vitamin B1 (Thiamine)</option>
          {/* Iron
          Fiber Deficiency
          Omega-3 Fatty Acids Deficiency
          Magnesium Deficiency */}
          <option value="Vitamin B2">Vitamin B2 (Riboflavin)</option>
          <option value="Vitamin B3">Vitamin B3 (Niacin)</option>
          <option value="Vitamin B12">Vitamin B12</option>
          <option value="Vitamin C">Vitamin C</option>
          <option value="Vitamin D">Vitamin D</option>
          <option value="Vitamin E">Vitamin E</option>
          <option value="Vitamin K">Vitamin K</option>
        </select>
        <button
          onClick={sendEmail}
          style={{
            ...styles.button,
            backgroundColor: loading ? "#6c757d" : "#28a745",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Diet Plan"}
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)", // Soft gradient background
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff", // White background for clarity
    padding: "40px",
    borderRadius: "25px", // Rounded corners for a friendly look
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)", // Light shadow for soft elevation
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
    border: "4px solid #28a745", // Green border for vibrancy
  },
  title: {
    marginBottom: "15px",
    color: "#28a745", // Bright green for the title
    fontSize: "28px", // Larger size to catch attention
    fontWeight: "700",
    fontFamily: "'Comic Sans MS', cursive, sans-serif", // Fun font for children
    textShadow: "2px 2px 5px rgba(40, 167, 69, 0.6)", // Subtle green shadow for a playful effect
  },
  description: {
    marginBottom: "25px",
    color: "#333333", // Dark text for readability
    fontSize: "18px",
    lineHeight: "1.6",
  },
  input: {
    width: "100%",
    padding: "12px 20px",
    marginBottom: "20px",
    border: "2px solid #28a745", // Green border for input fields
    borderRadius: "15px", // Rounded corners
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s",
    backgroundColor: "#DFFFD6", // Light green background for input fields
  },
  button: {
    width: "100%",
    padding: "12px 20px",
    backgroundColor: "", // Bright green button
    color: "#ffffff",
    border: "none",
    borderRadius: "15px", // Rounded corners for a soft look
    fontSize: "18px",
    fontWeight: "600",
    fontFamily: "'Comic Sans MS', cursive, sans-serif", // Fun, playful font
    transition: "background-color 0.3s",
    boxShadow: "0 4px 10px rgba(40, 167, 69, 0.4)", // Green shadow to match button
    cursor: "pointer", // Makes it clear that it's clickable
  },
  message: {
    marginTop: "20px",
    color: "#28a745", // Green text for consistency with the button and card
    fontSize: "16px",
    fontFamily: "'Comic Sans MS', cursive, sans-serif", // Playful font
    fontWeight: "bold", // Bold message to attract attention
  },
  select: {
    width: "100%",
    padding: "12px 20px",
    marginBottom: "20px",
    border: "2px solid #28a745",
    borderRadius: "15px",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s",
    backgroundColor: "#DFFFD6",
  },
};

export default EmailSender;
