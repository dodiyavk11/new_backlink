"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DomainRequest extends Model {
    static associate(models) {
      this.belongsTo(models.publisherDomain, {
        foreignKey: "domain_id",
        as: "domainRequests",
      });
      this.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }
  DomainRequest.init(
    {
      user_id: DataTypes.INTEGER,
      publisher_id: DataTypes.INTEGER,
      domain_id: DataTypes.INTEGER,
      message: DataTypes.STRING,
      pmessage: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      modelName: "DomainRequest",
      paranoid: false,
      tableName: "domain_request",
    }
  );
  return DomainRequest;
};
