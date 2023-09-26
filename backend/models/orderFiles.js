'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderFiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orderFiles.init({
    order_id: DataTypes.INTEGER,
    file_name: DataTypes.STRING,
    original_name:DataTypes.STRING,
    file_path:DataTypes.STRING,
    isLink:DataTypes.INTEGER,
    link:DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'orderFiles', 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    paranoid: false,
  });
  return orderFiles;
};