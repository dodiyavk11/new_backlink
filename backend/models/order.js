'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Domains, {
      //   foreignKey: 'domain_id',
      //   as: 'domain',
      // });
    }
  }
  order.init({
    customer_id: DataTypes.INTEGER,
    ordername: DataTypes.STRING,
    description: DataTypes.STRING,
    orderpriority: DataTypes.INTEGER,
    orderfile: DataTypes.STRING,
    orderstatus: DataTypes.INTEGER,
    update_status: DataTypes.INTEGER,
    update_status_admin: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    modelName: 'Orders',
    paranoid: false,
    deletedAt: "soft_delete",
  });
  return order;
};

