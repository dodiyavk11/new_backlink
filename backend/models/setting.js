'use strict'
const {
	Model
} = require("sequelize");
module.exports = (sequelize,DataTypes) => {
	class Setting extends Model
	{
		static associate(models)
		{
			 // Associate with Users model using user_id
		      this.belongsTo(models.Users, {
		        foreignKey: 'user_id',
		        as: 'user',
		      });
		}
	}
	Setting.init({
		user_id :DataTypes.INTEGER,
		email_message_received:DataTypes.TINYINT,		
		email_order_accepted:DataTypes.TINYINT,		
		email_order_completed:DataTypes.TINYINT,		
		email_order_created:DataTypes.TINYINT,		
		email_order_declined:DataTypes.TINYINT,		
		email_order_missing_details:DataTypes.TINYINT,		
		email_payment_failed:DataTypes.TINYINT,		
		email_payment_reminder:DataTypes.TINYINT,		
		email_payment_succeeded:DataTypes.TINYINT,		
		email_recommendations_available:DataTypes.TINYINT,		
	},
	{
		sequelize,
	    createdAt: 'created_at',
	    updatedAt: 'updated_at',
	    timestamps: true,
	    modelName: 'Setting',
	    paranoid: false,
	    tableName: 'notifications'
	});
	return Setting;
}