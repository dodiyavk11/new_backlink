'use strict';
const { Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
	class newOrder extends Model
	{
		static associate(models){
			this.belongsTo(models.publisherDomain, {
		        foreignKey: 'domain_id',
		        as: 'domain',
		    });
		    this.belongsTo(models.Users, {
		        foreignKey: 'customer_id',
		        as: 'customer',
		    });
			this.belongsTo(models.Users, {
		        foreignKey: 'publisher_id',
		        as: 'publisher',
		    });
		    this.belongsTo(models.Domains, {
		        foreignKey: 'project_id',
		        targetKey: 'hash_id',
		        as: 'project',
		    });
		    this.belongsTo(models.orderFiles, {
		        foreignKey: 'id',
		        targetKey: 'order_id',
		        as: 'orderFile',
		    });
		    this.hasMany(models.Message, {
			  foreignKey: 'order_id',
			  as: 'messages',
			});
		}
	}
	newOrder.init({
		publisher_id: DataTypes.INTEGER,
		customer_id: DataTypes.INTEGER,
		domain_id: DataTypes.INTEGER,
		backlink_id: DataTypes.INTEGER,
		status: {
	      type: DataTypes.ENUM('Pending','Inprogress','Completed','Cancelled','Rejected','MissingDetails'),
	    },
	    total_price: DataTypes.DECIMAL(10,2),
	    price: DataTypes.DECIMAL(10,2),
	    anchortext: DataTypes.STRING,
	    linktarget: DataTypes.STRING,
	    publication_date: {
		  type: DataTypes.DATE,
		  allowNull: true,
		  defaultValue: null,
		},
	    note: DataTypes.STRING,
	    project_id: DataTypes.STRING,
	    hash_id: DataTypes.STRING,
	    textCreation:DataTypes.STRING,
	    wordCount:DataTypes.INTEGER,
	    approveText:DataTypes.INTEGER,
	    textCreationPrice:DataTypes.DECIMAL(10,2),
	    approveTextPrice:DataTypes.DECIMAL(10,2),
	    chooseByBacklink:DataTypes.INTEGER,
	    isBundle:DataTypes.INTEGER,
	    created_at: {
	        type: DataTypes.DATE,
	        allowNull: true,
	        defaultValue: null,
	        get() {
	          const rawValue = this.getDataValue('created_at');
	          return moment(rawValue).format('YYYY-MM-DD HH:mm:ss');
	        },
	      },
	},
	{
		sequelize,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		timestamps: true,
		modelName: 'newOrder',
		paranoid: false,
		tableName: 'new_orders'

	});
	return newOrder;
}