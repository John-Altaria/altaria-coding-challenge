const { Model } = require("sequelize");

const eventModel = (sequelize, DataTypes) => {
  class Event extends Model {}

  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      creatorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.INTEGER,
        references: {
          model: "eventTypes",
          key: "id",
        },
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lon: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "events",
      timestamps: true,
    }
  );

  Event.associate = (models) => {
    Event.belongsToMany(models.User, {
      through: models.UserBookmark,
      foreignKey: "eventId",
      otherKey: "userId",
      as: "bookmarkedByUsers",
    });

    Event.belongsTo(models.User, {
      foreignKey: "creatorId",
      as: "creator",
    });

    Event.belongsTo(models.EventType, {
      foreignKey: "type",
      as: "eventType",
    });
  };

  return Event;
};

module.exports = eventModel;
