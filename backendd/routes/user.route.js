const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserAccount,
  followUser,
  unfollowUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Forget and Reset Password Routes
router.post("/forgot-password", forgotPassword); // Send password reset email
router.post("/reset-password/:token", resetPassword); // Reset password with token

// Protected Routes
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUserProfile
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUserAccount
);
router.post(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  followUser
);
router.post(
  "/unfollow/:id",
  passport.authenticate("jwt", { session: false }),
  unfollowUser
);

module.exports = router;
