const express = require("express");
const Feedback = require("../model/Feedback");
const { generateToken, verifyToken } = require("../utils/jwthelper");
const router = express.Router();

// Endpoint to submit feedback
router.post("/submitFeedback", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    // Verify and decode the token
    const decoded = verifyToken(token); // Replace with your actual secret key

    // Extract the email from the decoded token
    const userEmail = decoded.email;

    // Create a new feedback entry, appending the email
    const feedback = new Feedback({
      ...req.body,
      email: userEmail, // Overwrite or append the email from the token
    });

    await feedback.save();
    console.log("Feedback saved successfully.");
    res.status(200).send("Feedback submitted successfully!");
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }
    console.error("Error saving feedback:", err);
    res.status(500).send("Error submitting feedback.");
  }
});

router.get("/getAllFeedback", async (req, res) => {
  try {
    const feedbackEntries = await Feedback.find();
    res.status(200).json(feedbackEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/userFeedback", async (req, res) => {
  try {
    // Get token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Verify and decode the token
    const decoded = verifyToken(token);  // Replace with your secret key

    // Extract the email from the decoded token
    const userEmail = decoded.email;

    // Fetch feedback entries associated with the decoded email
    const feedbackEntries = await Feedback.find({ email: userEmail });

    if (!feedbackEntries) {
      return res.status(404).json({ message: "No feedback found" });
    }

    res.status(200).json(feedbackEntries);
  } catch (error) {
    console.error("Error fetching feedback entries:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to delete feedback
router.delete("/deleteFeedback/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).send("Feedback deleted successfully!");
  } catch (err) {
    res.status(500).send("Error deleting feedback.");
  }
});

// Endpoint to update feedback
router.put("/updateFeedback/:id", async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send("Feedback updated successfully!");
  } catch (err) {
    res.status(500).send("Error updating feedback.");
  }
});

module.exports = router;
