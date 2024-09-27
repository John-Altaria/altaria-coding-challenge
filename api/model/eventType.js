const { Model } = require("sequelize");

const eventTypeModel = (sequelize, DataTypes) => {
  class EventType extends Model {}

  EventType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "EventType",
      tableName: "eventTypes",
      timestamps: false,
    }
  );

  EventType.associate = (models) => {
    EventType.hasMany(models.Event, {
      foreignKey: "type",
      as: "events",
    });
  };

  return EventType;
};

module.exports = eventTypeModel;
