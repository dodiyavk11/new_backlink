'use strict'
const {
	Model
} = require("sequelize");
module.exports = (sequelize,DataTypes) => {
	class Domain extends Model
	{
		static associate(models)
		{
			 // Associate with Users model using user_id
			this.belongsTo(models.Users, {
				foreignKey: 'user_id',
				as: 'user',
			});

			// Associate with domain_category model using category_id
			this.belongsTo(models.domain_category, {
				foreignKey: 'category_id',
				as: 'category',
			});

			this.hasOne(models.customerDomainData, {
				foreignKey: 'domain_id',
				as: 'contentData',
			});
		    this.hasMany(models.newOrder,{
		      	foreignKey: 'domain_id', 
		      	as: 'orders'
		    });
		}
	}
	Domain.init({
		domain_name:DataTypes.STRING,
		tld:DataTypes.STRING,
		category_id:DataTypes.INTEGER,
		status:DataTypes.INTEGER,
		user_id:DataTypes.INTEGER,
		budget:DataTypes.DECIMAL(8, 2),
		hash_id:DataTypes.STRING
	},
	{
		sequelize,
	    createdAt: 'created_at',
	    updatedAt: 'updated_at',
	    timestamps: true,
	    modelName: 'Domains',
	    paranoid: false,
	    tableName:'domains'
	});
	return Domain;
}