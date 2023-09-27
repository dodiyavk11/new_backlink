'use strict';
const {
	Model, Sequelize, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class subscription_plan extends Model
	{
		static associate(models)	
		{
			// set table relationship here
		}
	}
	subscription_plan.init({
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		price: DataTypes.INTEGER,
		cancellation_period: DataTypes.INTEGER,
		max_domains_per_month: DataTypes.INTEGER,
		max_orders: DataTypes.INTEGER,
		credits_price: DataTypes.DECIMAL(10,2),
		credits_quota: DataTypes.INTEGER,
		status: DataTypes.INTEGER
	},
	{
		sequelize,
		createdAt:'created_at',
		updatedAt:'updated_at',
		timestamps:true,
		modelName: "SubscriptionPlans",
		paranoid:false,
		tableName:"subscription_plans"
	});
	return subscription_plan;
}