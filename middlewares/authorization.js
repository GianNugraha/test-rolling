const authorization = async (req, res, next) => {
    const user = req.user;

    try {
      if (user.role !== "admin") {
        throw { message: `unauthorized` };
      }
      next();
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = authorization;
  