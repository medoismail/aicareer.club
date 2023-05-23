// models/JobListing.js
const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // Add more fields as per your requirements
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

module.exports = JobListing;
