'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class email_format extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  email_format.init({
    email_type: DataTypes.TEXT,
    email_title:DataTypes.TEXT,
    email_content: DataTypes.TEXT,
    header: DataTypes.TEXT,
    file:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'email_format',
    tableName:"email_formats"
  });
  return email_format;
};