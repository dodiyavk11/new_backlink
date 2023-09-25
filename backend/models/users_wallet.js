'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_wallet extends Model {
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
  users_wallet.init({
    user_id: DataTypes.INTEGER,
    balance:DataTypes.DECIMAL(8, 2),
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'created_at',
    timestamps: true,
    modelName: 'UserWallet',
    paranoid: false,
    tableName: 'users_wallet',
  });
  return users_wallet;
};

