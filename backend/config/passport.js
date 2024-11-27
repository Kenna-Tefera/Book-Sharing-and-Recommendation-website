// const JwtStrategy = require("passport-jwt").Strategy; // Use JWT Strategy for passport authentication
// const ExtractJwt = require("passport-jwt").ExtractJwt; // JWT Extractor function. Accepts request as parameter and returns token string or null
// const mongoose = require("mongoose");
// const keys = require("./keys");

// const User = require("../model/User");

// const options = {}; // Set up for JWT Strategy
// // Two required parameters
// options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // Look for JWT from the Auth Header of a request
// options.secretOrKey = keys.secretOrKey;

// module.exports = (passport) => {
//   // Set up passport auth strategy. Strategy is the term for "authentication method" in passport
//   // jwt_payload is the user info carried by the token. In this app, the user id in the database will be included in it
//   // The user id then allows us to search for the user in the db
//   passport.use(
//     new JwtStrategy(options, async (jwt_payload, done) => {
//       try {
//         const user = await User.findById(jwt_payload.id);
//         if (user) {
//           return done(null, user);
//         }
//         return done(null, false, { message: "User not found" });
//       } catch (error) {
//         console.error("Error in Passport strategy:", error.message);
//         return done(error, false);
//       }
//     })
//   );
// };

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
          return done(null, user); // If user exists, proceed
        }
        return done(null, false, { message: "User not found" }); // If no user found, return false
      } catch (error) {
        console.error("Error in Passport strategy:", error.message);
        return done(error, false); // Error in passport strategy
      }
    })
  );
};
