const dbConfig = require("../config/config.js");

const Sequelize = require("sequelize");

const dataInsertCall = require("../utils/static.Data.js");

const callRegStaticData = new dataInsertCall();

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./user.js")(sequelize, Sequelize);
db.Events = require("./events.js")(sequelize, Sequelize);
db.EventTypes = require("./eventType.js")(sequelize, Sequelize);

db.sequelize
  .sync({ force: false })
  .then(async () => {
    console.log("DB Sync Complete");
    const eventTypesCount = await db.EventTypes.count();

    if (eventTypesCount > 0) {
      console.log("Types Created Before....");
    } else {
      try {
        await db.EventTypes.bulkCreate(callRegStaticData.regEventTypes());
        console.log("Event Types Created Successfully!");
      } catch (error) {
        throw error;
      }
    }
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = db;
