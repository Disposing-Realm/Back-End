const jwt = require("jsonwebtoken");
const Users = require("./model/userModel");
require("dotenv").config();

const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("Token not found, please login.");
    }
  
    const { email } = await jwt.verify(
      token,
      process.env.AUTH_KEY,
      (err, decoded) => {
        if (err) {
          throw Error("Failed to authenticate token");
        }
        return decoded;
      }
    );
  
    const user = await Users.getByEmail(email);
  
    if (!user) {
      return res.status(404).send("No user found.");
    }
    req.id = user.id;
    console.log(user, "in auth.js");
    next();
  };
  
  module.exports = authenticate;