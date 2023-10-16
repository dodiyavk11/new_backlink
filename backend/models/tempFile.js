'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class tempFile extends Model
	{
		static associate(models)
		{

		}
	}
	tempFile.init({
		user_id: DataTypes.INTEGER,
		fileKey: DataTypes.STRING,
		fileName: DataTypes.STRING
	},
	{
		sequelize,
		createdAt: "created_at",
		updatedAt: false,
		timestamps:true,
		modelName: "tempFile",
		tableName: "temp_file",
		paranoid: false
	});
	return tempFile;
}