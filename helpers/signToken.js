const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretkey = process.env.SECRETKEY;

signToken = (x) => {
  return jwt.sign(x, secretkey);
};

module.exports = signToken;
