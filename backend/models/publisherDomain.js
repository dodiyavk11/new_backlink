'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
	class publisherDomain extends Model
	{
		static associate(models)
		{
			this.belongsTo(models.domain_category, {
		        foreignKey: 'category_id',
		        as: 'category',
		    });
		    
		    this.hasOne(models.publisherDomainData, {
				foreignKey: 'domain_id',
				as: 'contentData',
			});
			this.hasMany(models.userCart, {
			  foreignKey: 'hash_id',
			  as: 'domainData',
			});
		}
	}
	publisherDomain.init({
		domain_name:DataTypes.STRING,
		tld:DataTypes.STRING,
		category_id:DataTypes.INTEGER,
		status:DataTypes.INTEGER,
		anchorText: DataTypes.STRING,
		deliveryTime:DataTypes.INTEGER,
		attribute:DataTypes.STRING,
		sensitiveTopic:DataTypes.INTEGER,
		sensitiveTopicCharge:DataTypes.DECIMAL(10,2),
		minWordCount:DataTypes.INTEGER,
		textByCustomer:DataTypes.INTEGER,
		textInclude:DataTypes.INTEGER,
		language:DataTypes.STRING,
		user_id:DataTypes.INTEGER,
		price:DataTypes.DECIMAL(8, 2),
		hash_id:DataTypes.STRING
	},
	{
		sequelize,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		timestamps: true,
	    modelName: 'publisherDomain',
	    paranoid: false,
	    tableName:"publisher_domains"
	});
	return publisherDomain;
}
