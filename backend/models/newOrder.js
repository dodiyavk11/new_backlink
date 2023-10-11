'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class newOrder extends Model
	{
		static associate(models){

		}
	}
	newOrder.init({
		publisher_id: DataTypes.INTEGER,
		customer_id: DataTypes.INTEGER,
		domain_id: DataTypes.INTEGER,
		status: {
	      type: DataTypes.ENUM('Placed', 'Approved', 'Decline', 'Completed', 'Cancelled'),
	    },
	    total_price: DataTypes.DECIMAL(10,2),
	    anchortext: DataTypes.STRING,
	    linktarget: DataTypes.STRING,
	    publication_date: {
		  type: DataTypes.DATE,
		  allowNull: true,
		  defaultValue: null,
		},
	    note: DataTypes.STRING,
	    project_id: DataTypes.STRING,
	    hash_id: DataTypes.STRING,
	},
	{
		sequelize,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		timestamps: true,
		modelName: 'newOrder',
		paranoid: false,
		tableName: 'new_orders'

	});
	return newOrder;
}