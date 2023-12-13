'use strict'
const {
	Model
} = require("sequelize");
module.exports = (sequelize,DataTypes) => {
	class favoriteProducts extends Model
	{
		static associate(models)
		{
			//
		}
	}
	favoriteProducts.init({
		user_id:DataTypes.INTEGER,
		product_id:DataTypes.INTEGER
	},
	{
		sequelize,
	    createdAt: 'created_at',
	    timestamps: false,
	    modelName: 'favoriteProducts',
	    paranoid: false,
	    tableName:'favorite_products'
	});
	return favoriteProducts;
}