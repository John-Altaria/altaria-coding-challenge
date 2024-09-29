const express = require("express");

const router = express.Router();

const { signup, login } = require("../controllers/auth");
const { verify_X_API_KEY } = require("../middleware/auth");

router.post("/signup", verify_X_API_KEY, signup);
router.post("/", verify_X_API_KEY, login);
module.exports = router;
