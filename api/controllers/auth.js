const { errorHandler } = require("../utils/error");
const Auth = require("../services/auth.service");

exports.signup = async (req, res) => {
  let response = {
    code: 201,
    message: "Sign up in successful",
  };

  try {
    const { user, token } = await Auth.signup(req.body);
    res.status(201).json({ ...response });
  } catch (error) {
    errorHandler(error, res);
  }
};
