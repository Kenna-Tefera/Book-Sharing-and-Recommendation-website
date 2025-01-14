// require("dotenv").config(); // Acess env file

// module.exports = {
//   // mongoURI: "mongodb+srv://annatefera3:WDkvzpFs0lCY17sY@cluster1.wbt87ht.mongodb.net/", // bookdb is the database name
//   mongoURI:
//   // secretOrKey: `${process.env.SECRET}`, // secret key for JWT
//   secretOrKey: "mySuperSecretKey12345!",
// };

require("dotenv").config(); // Load .env variables
module.exports = {
  mongoURI:
    "mongodb+srv://Betelihem:123@cluster0.2q16d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  secretOrKey: process.env.SECRET || "mySuperSecretKey12345!", // Default to hardcoded key
};
