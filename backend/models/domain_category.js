'use strict';

const {
	Model
} = require('sequelize');
module.exports = (sequelize,DataTypes) => {
	class domain_category extends Model
	{
		static associate(models) 
		{
			this.hasMany(models.Domains, {
				foreignKey: 'category_id',
				as: 'domains',
			});
		}
	}
	domain_category.init({
		name: DataTypes.STRING,
		description: DataTypes.STRING
	}, {
		sequelize,
		modelName: "domain_category"
	});
	return domain_category;
};
