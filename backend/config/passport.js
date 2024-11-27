const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const keys = require("./keys");

const User = require("../model/User");

const options = {}; // Set up for JWT Strategy
// Two required parameters
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // Extract JWT from the Authorization header
options.secretOrKey = keys.secretOrKey; // Secret key for verification

module.exports = (passport) => {
  // Passport JWT strategy setup
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        // Look up user using the ID from JWT payload
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false, { message: "User not found" });
      } catch (error) {
        console.error("Error in Passport strategy:", error.message);
        return done(error, false);
      }
    })
  );
};
