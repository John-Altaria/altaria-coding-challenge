const bcrypt = require("bcryptjs");
const db = require("../model");
const { AppError, errorHandler } = require("../utils/error");

class AuthService {
  signup = async (body) => {
    const { email, password } = body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }
    try {
      const userExists = await db.Users.findOne({ where: { email } });

      if (!!userExists) {
        throw new AppError("Email exists, log in?", 400);
      }
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      const user = await db.Users.create({
        email,
        password: encryptedPassword,
      });
      console.log(user);
      return true;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new AuthService();
