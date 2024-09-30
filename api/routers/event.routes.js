const express = require("express");

const router = express.Router();

const {
  addEvents,
  editEvents,
  fetchEvents,
  fetchEventTypes,
  bookmarkEvent,
} = require("../controllers/event");
const { verify_X_API_KEY } = require("../middleware/auth");
const verifyUser = require("../middleware/verifyUser");

router.post("/", verify_X_API_KEY, verifyUser, addEvents);
router.post("/bookmark", verify_X_API_KEY, verifyUser, bookmarkEvent);
router.patch("/edit", verify_X_API_KEY, verifyUser, editEvents);
router.get("/", verify_X_API_KEY, verifyUser, fetchEvents);
router.get("/types", verify_X_API_KEY, verifyUser, fetchEventTypes);

module.exports = router;
