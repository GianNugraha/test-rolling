const bcrypt = require("bcrypt");

hashPassword = (x) => {
  return bcrypt.hashSync(x, bcrypt.genSaltSync(5));
};
module.exports = hashPassword;
