// db.js
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://aicarrer:9yvP59AKbbtM8qDU@cluster0.vzefjz7.mongodb.net/';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
