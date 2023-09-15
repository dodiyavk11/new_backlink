'use strict';

const {
	Model
} = require('sequelize');
module.exports = (sequelize,DataTypes) => {
	class domain_tag extends Model
	{
		static associate(models) 
		{			 
		}
	}
	domain_tag.init({
		name: DataTypes.STRING,
		status: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: "domain_tag"
	});
	return domain_tag;
};
