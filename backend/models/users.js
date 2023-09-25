'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       this.hasMany(models.Domains, {
        foreignKey: 'user_id',
        as: 'domains',
      });

      this.hasOne(models.UserWallet, {
        foreignKey: 'user_id',
        as: 'userAccountBalnace',
      });
      
      this.hasMany(models.Transactions, {
        foreignKey: 'user_id',
        as: 'transaction',
      });
    }
  }
  User.init({
    email: DataTypes.STRING,
    email_verified: DataTypes.BOOLEAN,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    profile: DataTypes.STRING,
    phone: DataTypes.STRING,
    isAdmin: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    modelName: 'Users',
    paranoid: false
  });
  return User;
};