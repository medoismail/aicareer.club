// routes/api.js
const express = require('express');
const router = express.Router();
const JobListing = require('../models/JobListing');

// Create a new job listing
router.post('/aicarrers', async (req, res) => {
  try {
    const jobListing = new JobListing(req.body);
    await jobListing.save();
    res.status(201).json(jobListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all job listings
router.get('/aicarrers', async (req, res) => {
  try {
    const jobListings = await JobListing.find();
    res.json(jobListings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
