'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
	class userCart extends Model
	{
		static associate(models)
		{

		}
	}
	userCart.init({
		user_id: DataTypes.INTEGER,
		hash_id: DataTypes.STRING,
		quantity: DataTypes.INTEGER,
	},
	{
		sequelize,
		createdAt: "created_at",
		updatedAt: "updated_at",
		timestamps: true,
		paranoid: false,
		modelName: "userCart",
		tableName: "user_cart"
	});	
	return userCart;
}