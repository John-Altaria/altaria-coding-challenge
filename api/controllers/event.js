const { errorHandler } = require("../utils/error");
const Event = require("../services/event.service");

exports.fetchEvents = async (req, res) => {
  let response = {
    code: 200,
    message: "Fetched events successfully!",
  };

  try {
    const data = await Event.fetchEvents(req.query, req.user);
    res.status(200).json({ ...response, data });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.addEvents = async (req, res) => {
  let response = {
    code: 200,
    message: "Event added successfully!",
  };
  try {
    await Event.addEvents(req.body, req.user);
    res.status(201).json({ ...response, data: null });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.editEvents = async (req, res) => {
  let response = {
    code: 200,
    message: "Event edited successfuly!",
  };
  try {
    const data = await Event.editEvents(req.body);
    res.status(201).json({ ...response, data: { ...data } });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.fetchEventTypes = async (req, res) => {
  let response = {
    code: 200,
    message: "Event Types fetched successfuly!",
  };
  try {
    const data = await Event.fetchEventTypes(req.body);
    res.status(201).json({ ...response, data });
  } catch (error) {
    errorHandler(error, res);
  }
};
