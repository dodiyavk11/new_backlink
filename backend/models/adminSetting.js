"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class adminSetting extends Model {
    static associate(models) {}
  }
  adminSetting.init(
    {
        vat: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "adminSetting",
      paranoid: false,
      tableName: "settings",
    }
  );
  return adminSetting;
};
