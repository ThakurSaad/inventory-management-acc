const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(cors());

// schema design
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this product"],
    trim: true,
    unique: true,
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: [100, "Name is too large"],
  },
});

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
