// routes/symptoms.js

const express = require('express');
const router = express.Router();

// Simulate a database (you can replace this with actual DB logic)
let symptomsDatabase = [];

// POST request to save symptoms
router.post('/', (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms) {
    return res.status(400).json({ message: 'Symptoms are required.' });
  }

  // Save to database (for now, we'll just push it to an array)
  symptomsDatabase.push({ id: symptomsDatabase.length + 1, symptoms });
  return res.status(201).json({ message: 'Symptoms recorded successfully!' });
});

// Optional: GET request to retrieve all symptoms (for testing purposes)
router.get('/', (req, res) => {
  res.status(200).json(symptomsDatabase);
});

module.exports = router;
