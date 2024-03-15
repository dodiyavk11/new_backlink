"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user_subscriptions extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: "user_id",
        as: "user",
      });
      // this.belongsTo(models.SubscriptionPlans,{
      // 	foreignKey: 'plan_id',
      // 	as: 'plan'
      // });
      this.belongsTo(models.Subscriptions, {
        foreignKey: "plan_id",
        as: "plan",
      });
      this.belongsTo(models.Transactions, {
        foreignKey: "transaction_id",
        as: "transaction",
      });
    }
  }
  user_subscriptions.init(
    {
      user_id: DataTypes.INTEGER,
      plan_id: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      cancel_date: DataTypes.DATE,
      info: DataTypes.STRING,
      credits: DataTypes.INTEGER,
      transaction_id: DataTypes.STRING,
      payment_data: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      paranoid: false,
      modelName: "UserSubscription",
      tableName: "user_subscriptions",
    }
  );
  return user_subscriptions;
};
