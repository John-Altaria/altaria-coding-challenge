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

db.User = require("./user.js")(sequelize, Sequelize.DataTypes);
db.Event = require("./events.js")(sequelize, Sequelize.DataTypes);
db.EventType = require("./eventType.js")(sequelize, Sequelize.DataTypes);
db.UserBookmark = require("./userBookmark.js")(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize
  .sync({ force: false })
  .then(async () => {
    console.log("DB Sync Complete");
    const eventTypesCount = await db.EventType.count();

    if (eventTypesCount > 0) {
      console.log("Types Created Before....");
    } else {
      try {
        await db.EventType.bulkCreate(callRegStaticData.regEventTypes());
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
