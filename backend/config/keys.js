require("dotenv").config(); // Acess env file

module.exports = {
  mongoURI: "mongodb+srv://annatefera3:WDkvzpFs0lCY17sY@cluster1.wbt87ht.mongodb.net/", // bookdb is the database name
  secretOrKey: `${process.env.SECRET}` // secret key for JWT
};
