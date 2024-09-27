const { AppError, errorHandler } = require("../utils/error");

exports.verify_X_API_KEY = async (req, res, next) => {
  try {
    const x_api_key = req.headers["x-api-key"];
    if (!x_api_key || x_api_key !== process.env.X_API_KEY) {
      throw new AppError("Unauthorized to access this Route", 403);
    }
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};
