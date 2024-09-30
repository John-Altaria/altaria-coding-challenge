const jwt = require("jsonwebtoken");
const { AppError, errorHandler } = require("../utils/error");

const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized to access this resource!", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError("Unauthorized to access this resource!", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    let err = error;
    if (error.name === "TokenExpiredError") {
      err = new AppError("Token expired. Please log in again.", 401);
    } else if (error.name === "JsonWebTokenError") {
      err = new AppError("Invalid token. Please log in again.", 401);
    }
    errorHandler(err, res);
  }
};

module.exports = verifyUser;
