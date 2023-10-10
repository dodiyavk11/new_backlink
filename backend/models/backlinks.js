'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
	class Backlinks extends Model
	{
		static associate(models)
		{
			this.belongsTo(models.domain_category, {
		        foreignKey: 'category_id',
		        as: 'category',
		      });
		}
	}
	Backlinks.init({
		domain_name:DataTypes.STRING,
		tld:DataTypes.STRING,
		category_id:DataTypes.INTEGER,
		status:DataTypes.INTEGER,
		user_id:DataTypes.INTEGER,
		price:DataTypes.DECIMAL(8, 2),
		hash_id:DataTypes.STRING
	},
	{
		sequelize,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		timestamps: true,
	    modelName: 'Backlinks',
	    paranoid: false,
	    tableName:"publisher_domains"
	});
	return Backlinks;
}
