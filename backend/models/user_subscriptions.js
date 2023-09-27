'use strict'
const { Model,Sequelize,DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class user_subscriptions extends Model
	{
		static associate(models)
		{

		}
	}
	user_subscriptions.init({
		user_id: DataTypes.INTEGER,
		plan_id: DataTypes.INTEGER,
		start_date: DataTypes.DATE,
		end_date: DataTypes.DATE,
		cancel_date: DataTypes.DATE,
		info: DataTypes.STRING,
		credits: DataTypes.INTEGER,
		transaction_id: DataTypes.INTEGER,
	},
	{
		sequelize,
		timestamps:false,
		paranoid:false,
		modelName: "UserSubscription",
		tableName:"user_subscriptions"
	});
	return user_subscriptions;
}