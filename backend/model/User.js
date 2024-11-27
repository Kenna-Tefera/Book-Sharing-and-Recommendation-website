// // models/User.js
// const mongoose = require("mongoose");
// const bookSchema = require("./Book"); // Update the path if needed
// const reviewSchema = require("./Review")
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   image: {
//     data: Buffer,
//     contentType: String,
//   },
//   username: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   bio: {
//     type: String,
//   },
//   books: [bookSchema], // A collection of books by user
//   reviews: [reviewSchema.schema], // A collection of reviews by user
// });

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  // username: { type: String, unique: true },
  username: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  bio: { type: String, default: "" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// Hash password before saving to DB
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
