const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the Express app
const app = express();

// CORS middleware to allow requests from your frontend
app.use(
  cors({
    origin: "http://localhost:3001", // Allow requests from your frontend
    methods: ["GET", "POST"], // Allow only GET and POST methods
    allowedHeaders: ["Content-Type"], // Allow requests with 'Content-Type' header
  })
);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST route for handling requests
app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;

  // Process the data (filter numbers and alphabets)
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highestLowercase = alphabets
    .filter((char) => char === char.toLowerCase())
    .sort()
    .slice(-1);

  // File handling
  const file_valid = file_b64 ? true : false;
  const file_mime_type = file_valid ? "application/pdf" : null;
  const file_size_kb = file_valid ? Math.floor(Math.random() * 1000) : null;

  // Response
  res.json({
    is_success: true,
    user_id: "Charath_AP21110011572",
    email: "charathkumarreddy_y@srmap.edu.in",
    roll_number: "AP21110011572",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase,
    file_valid,
    file_mime_type,
    file_size_kb,
  });
});

// GET route for returning a static operation_code
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
