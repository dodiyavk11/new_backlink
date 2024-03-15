"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class subscriptions extends Model {
    static associate(models) {
      // set table relationship here
    }
  }
  subscriptions.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      stripe_product_id: DataTypes.STRING,
      stripe_price_id: DataTypes.STRING,
      validity: DataTypes.INTEGER,
      max_request_per_day: DataTypes.INTEGER,
      max_request_per_month: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      modelName: "Subscriptions",
      paranoid: false,
      tableName: "subscription",
    }
  );
  return subscriptions;
};
