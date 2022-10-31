const errorHandlers = (err, req, res, next) => {
    console.log(err); //check error here gaes
    switch (err.message) {
      //auth
      case "noAccess":
        res.status(401).json("Anda tidak memiliki Autentikasi! Harap Login.");
        break;
      case "Invalid Authentication":
        res.status(401).json("Autentikasi tidak Valid. Silakan Login Ulang.");
        break;
      default:
        res.status(500).json(err.message);
        break;
    }
  };
  
  module.exports = errorHandlers;
  