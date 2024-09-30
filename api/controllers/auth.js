const { errorHandler } = require("../utils/error");
const Auth = require("../services/auth.service");

exports.signup = async (req, res) => {
  let response = {
    code: 201,
    message: "Sign up successful",
  };

  try {
    await Auth.signup(req.body);
    res.status(201).json({ ...response });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.login = async (req, res) => {
  let response = {
    code: 200,
    message: "Sign in successful",
  };
  try {
    const data = await Auth.login(req.body);
    res.status(200).json({ ...response, data: { ...data } });
  } catch (error) {
    errorHandler(error, res);
  }
};
