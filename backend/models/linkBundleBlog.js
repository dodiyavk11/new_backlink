"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class linkBundleBlog extends Model {
    static associate(models) {}
  }
  linkBundleBlog.init(
    {
      heading: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
        sequelize,
        timestamps: false,
        modelName: "linkBundleBlog",
        tableName: "link_bundle_blog",
        paranoid: false,
    }
  );
  return linkBundleBlog;
};
