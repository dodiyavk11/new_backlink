'use strict';

const {
	Model
} = require('sequelize');
module.exports = (sequelize,DataTypes) => {
	class blog extends Model
	{
		static associate(models) 
		{			 
		}
	}
	blog.init({
		title: DataTypes.STRING,
		content: DataTypes.STRING,
		author: DataTypes.INTEGER,
		status:DataTypes.INTEGER
	}, {
		sequelize,
	    createdAt: 'created_at',
	    updatedAt: 'updated_at',
	    timestamps: true,
	    modelName: 'Blogs',
	    paranoid: false
	});
	return blog;
};
