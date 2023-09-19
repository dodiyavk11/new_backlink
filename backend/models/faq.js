'use strict';

const {
	Model
} = require('sequelize');
module.exports = (sequelize,DataTypes) => {
	class faq extends Model
	{
		static associate(models) 
		{			 
		}
	}
	faq.init({
		question: DataTypes.STRING,
		answer: DataTypes.STRING,
		status:DataTypes.INTEGER
	}, {
		sequelize,
	    createdAt: 'created_at',
	    updatedAt: 'updated_at',
	    timestamps: true,
	    modelName: 'Faqs',
	    paranoid: false
	});
	return faq;
};
