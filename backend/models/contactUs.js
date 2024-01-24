"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class contactUs extends Model {
    static associate(models) {}
  }
  contactUs.init({
    name:DataTypes.STRING,
    email:DataTypes.STRING,
    mobile:DataTypes.STRING,
    comment:DataTypes.STRING,
    status:DataTypes.INTEGER,
  },{
    sequelize,
    createdAt: "created_at",
    updatedAt:"updated_at",
    timestamps: true,
    modelName: "contactUs",
    paranoid: false,
    tableName: "contact_us",
  });
  return contactUs;
};
