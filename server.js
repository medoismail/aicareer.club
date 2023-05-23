// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());

// Set up MongoDB connection
mongoose.connect('mongodb+srv://aicarrer:9yvP59AKbbtM8qDU@cluster0.vzefjz7.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Set up Multer storage for company logos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Set up Nodemailer for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Define the route for submitting job listings
app.post('/api/aicarrers', upload.single('logo'), (req, res) => {
  const { title, description, email } = req.body;
  const logoPath = req.file.path;

  // Save the job listing to the database (you need to create a JobListing model)

  // Send email notification to the provided email address
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'New Job Listing',
    html: `<h1>New Job Listing</h1>
           <p>Title: ${title}</p>
           <p>Description: ${description}</p>
           <img src="cid:logo" alt="Company Logo"/>`,
    attachments: [
      {
        filename: 'logo.png',
        path: logoPath,
        cid: 'logo',
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  res.status(201).json({ message: 'Job listing submitted successfully' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
