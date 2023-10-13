'use strict'
const { Model } = require('sequelize');
 
module.exports = (sequelize, DataTypes) => {
	class publisherDomainData extends Model
	{
		static associate(models)
		{
			this.belongsTo(models.publisherDomain, {
		        foreignKey: 'domain_id',
		        as: 'backlinkData',
		    });
		}
	}
	publisherDomainData.init({
		domain_id: DataTypes.INTEGER,
		traffic: DataTypes.INTEGER,
		anchor_text: DataTypes.STRING,
		delivery_time: DataTypes.STRING,
		link: DataTypes.STRING,
		language: DataTypes.STRING,
		visibility_index: DataTypes.DECIMAL(10,2),
		domain_rating: DataTypes.INTEGER,
		rating: DataTypes.DECIMAL(1,1),
		referring: DataTypes.INTEGER,
		citation_flow: DataTypes.INTEGER,
		trust_flow: DataTypes.INTEGER,
		authority: DataTypes.INTEGER,
	},
	{
		sequelize,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		timestamps: true,
		modelName: "publisherDomainData",
		paranoid: false,
		tableName: "publisher_domain_data"
	});
	return publisherDomainData;
}