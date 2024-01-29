'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.newOrder, {
        foreignKey: 'order_id',
        as: 'order', 
      });
      this.belongsTo(models.Users, {
        foreignKey: 'sender_id',
        as: 'sender',
      });

      this.belongsTo(models.Users, {
        foreignKey: 'receiver_id',
        as: 'receiver',
      });
    }
  }
  Message.init({
    sender_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    files:DataTypes.TEXT
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    modelName: 'Message',
    paranoid: false,
    tableName: "messages"
  });
  return Message;
};

