const db = require("../model");
const { Op } = require("sequelize");
const { AppError, errorHandler } = require("../utils/error");

class EventService {
  fetchEvents = async (query, user) => {
    try {
      let options = {};

      if (!!query.coord) {
        const lat = parseFloat(query.coord.split(",")[0]);
        const lon = parseFloat(query.coord.split(",")[1]);
        const radiusInMeters = 2000;

        if (isNaN(lat) || isNaN(lon)) {
          throw new Error("Invalid coordinates provided.");
        }

        const earthRadius = 6371000;

        // Calculate degree difference for 200 meters (for both latitude and longitude)
        const latRadius = (radiusInMeters / earthRadius) * (180 / Math.PI);
        const lonRadius =
          (radiusInMeters / (earthRadius * Math.cos((lat * Math.PI) / 180))) *
          (180 / Math.PI);

        console.log(`Latitude Range: ${lat - latRadius} to ${lat + latRadius}`);
        console.log(
          `Longitude Range: ${lon - lonRadius} to ${lon + lonRadius}`
        );

        options = {
          include: [
            {
              model: db.EventType,
              as: "eventType",
            },
          ],
          where: {
            lat: {
              [Op.between]: [lat - latRadius, lat + latRadius],
            },
            lon: {
              [Op.between]: [lon - lonRadius, lon + lonRadius],
            },
          },
        };
      }

      const events = await db.Event.findAll(options);

      return events;
    } catch (error) {
      throw error;
    }
  };

  fetchEventTypes = async () => {
    try {
      const eventTypes = await db.EventType.findAll();
      return eventTypes;
    } catch (error) {
      throw error;
    }
  };

  addEvents = async (body, user) => {
    try {
      await db.Event.create({ ...body, creatorId: user.id });
      return null;
    } catch (error) {
      throw error;
    }
  };

  editEvents = async (body) => {
    try {
      const event = await db.Event.update(body, { where: { id: body.id } });
      return event;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new EventService();
