const verifyToken = require("../helpers/verifyToken");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token;
    if (!access_token) {
      throw { message: `noAccess` };
    }
    const user = verifyToken(access_token);
    const userFromDB = await User.findByPk(user.id);
    if (!userFromDB) {
      throw { message: "Invalid Authentication, Please Re-Login" };
    }
    if (user.password !== userFromDB.password) {
      throw { message: "Invalid Authentication" };
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
