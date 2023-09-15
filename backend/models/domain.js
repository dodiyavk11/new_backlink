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
		}
	}
	Domain.init({
		domain_name:DataTypes.STRING,
		category_id:DataTypes.INTEGER,
		status:DataTypes.INTEGER,
		user_id:DataTypes.INTEGER,
		budget:DataTypes.DECIMAL(8, 2),
	},
	{
		sequelize,
	    createdAt: 'created_at',
	    updatedAt: 'updated_at',
	    timestamps: true,
	    modelName: 'Domains',
	    paranoid: false
	});
	return Domain;
}