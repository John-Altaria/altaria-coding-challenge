const express = require("express");

const router = express.Router();

const { signup } = require("../controllers/auth");
const { verify_X_API_KEY } = require("../middleware/auth");

router.post("/signup", verify_X_API_KEY, signup);

module.exports = router;
