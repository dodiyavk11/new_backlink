'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
	class userCart extends Model
	{
		static associate(models)
		{
			this.belongsTo(models.publisherDomain, {
		        foreignKey: 'hash_id',
		        targetKey: 'hash_id',
		        as: 'cartItems',
		    });
		}
	}
	userCart.init({
		user_id: DataTypes.INTEGER,
		cart_id: DataTypes.STRING,
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