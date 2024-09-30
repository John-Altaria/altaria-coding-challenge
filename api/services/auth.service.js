const bcrypt = require("bcryptjs");
const db = require("../model");
const { AppError, errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");

class AuthService {
  signup = async (body) => {
    const { email, password } = body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }
    try {
      const userExists = await db.User.findOne({ where: { email } });

      if (!!userExists) {
        throw new AppError("Email exists, log in?", 400);
      }
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      const user = await db.User.create({
        email,
        password: encryptedPassword,
      });

      return true;
    } catch (error) {
      throw error;
    }
  };

  login = async (body) => {
    const { email, password } = body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }
    try {
      const user = await db.User.findOne({ where: { email } });

      if (!user) {
        throw new AppError("User not found", 404);
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new AppError("Invalid credentials", 401);
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRATION_TIME }
      );

      user.password = null;

      return { user, token };
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new AuthService();
