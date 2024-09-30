const { Model } = require("sequelize");

const userModel = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.belongsToMany(models.Event, {
      through: models.UserBookmark,
      foreignKey: "userId",
      otherKey: "eventId",
      as: "bookmarkedEvents",
    });

    User.hasMany(models.Event, {
      foreignKey: "creatorId",
      as: "events",
    });
  };

  return User;
};

module.exports = userModel;
