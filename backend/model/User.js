// models/User.js
const mongoose = require("mongoose");
const bookSchema = require("./Book"); // Update the path if needed
const reviewSchema = require("./Review")
const Schema = mongoose.Schema;

const userSchema = new Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  books: [bookSchema], // A collection of books by user
  reviews: [reviewSchema.schema], // A collection of reviews by user
});

module.exports = mongoose.model("User", userSchema);
