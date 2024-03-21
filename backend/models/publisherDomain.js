"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class publisherDomain extends Model {
    static associate(models) {
      this.belongsTo(models.domain_category, {
        foreignKey: "category_id",
        as: "category",
      });

      this.belongsTo(models.Users, {
        foreignKey: "user_id",
        as: "publisher",
      });

      this.hasOne(models.publisherDomainData, {
        foreignKey: "domain_id",
        as: "contentData",
      });
      this.hasMany(models.userCart, {
        foreignKey: "hash_id",
        as: "domainData",
      });
      this.hasMany(models.Message, {
        foreignKey: "domain_id",
        as: "messageData",
      });
      this.hasMany(models.newOrder, {
        foreignKey: "domain_id",
        as: "orderData",
      });
      this.hasMany(models.DomainRequest, {
        foreignKey: "domain_id",
        as: "domainRequest",
      });
    }
  }
  publisherDomain.init(
    {
      domain_name: DataTypes.STRING,
      tld: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      anchorText: DataTypes.STRING,
      deliveryTime: DataTypes.INTEGER,
      attribute: DataTypes.STRING,
      sensitiveTopic: DataTypes.INTEGER,
      sensitiveTopicCharge: DataTypes.DECIMAL(10, 2),
      minWordCount: DataTypes.INTEGER,
      textByCustomer: DataTypes.INTEGER,
      textInclude: DataTypes.INTEGER,
      language: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(8, 2),
      // price: {
      // 	type: DataTypes.DECIMAL(8, 2),
      // 	allowNull: false,
      // 	get() {
      // 	  const price = this.getDataValue("price");
      // 	  return price ? price.replace(".", ",") : null;
      // 	},
      //   },
      hash_id: DataTypes.STRING,
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      modelName: "publisherDomain",
      paranoid: false,
      tableName: "publisher_domains",
    }
  );
  return publisherDomain;
};
