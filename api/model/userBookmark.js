const { Model } = require("sequelize");

const userBookmarkModel = (sequelize, DataTypes) => {
  class UserBookmark extends Model {}

  UserBookmark.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      eventId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Event",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "UserBookmark",
      tableName: "userBookmarks",
      timestamps: true,
    }
  );

  return UserBookmark;
};

module.exports = userBookmarkModel;
