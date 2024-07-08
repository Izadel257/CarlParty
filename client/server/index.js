const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require("cors");
const app = express();
const bodyParser = require ('body-parser');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const authRoutes = require ("./routes/authRoutes")
const mapsRoute = require ("./routes/mapsRoute")

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:1573'); // Replace with your frontend URL during development
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));

// Load environment variables
const MONGODB_URI = process.env.MONGODB_URI;
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI);

// Check connedfdsfsdtion
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(3001, () => console.log("Listening on port 3001"));
});

app.use("/api/user", authRoutes)
app.use("/api/maps", mapsRoute)


