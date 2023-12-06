'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }
  transaction.init({
    user_id: DataTypes.INTEGER,
    amount:DataTypes.DECIMAL(8, 2),
    transaction_type: DataTypes.STRING,
    description: DataTypes.STRING,
    payment_created: {
      type: DataTypes.DATE,
    },
    transaction_id:DataTypes.STRING,
    isPlan: DataTypes.INTEGER,
    status: DataTypes.STRING,
    paymentData: DataTypes.JSON,
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: false,
    timestamps: true,
    modelName: 'Transactions',
    paranoid: false,
    tableName: "transactions"
  });
  return transaction;
};

