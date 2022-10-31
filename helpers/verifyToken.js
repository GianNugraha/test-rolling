const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretkey = process.env.SECRETKEY;

verifyToken=(x)=>{
    return jwt.verify(x,secretkey)
}

module.exports=verifyToken