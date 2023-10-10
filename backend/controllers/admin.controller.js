const fs = require("fs")
const Models = require("../models")
const bcrypt = require("bcryptjs")
const path = require("path")
const { unlinkProfile } = require("../utils/deleteFile")
const { Op } = require("sequelize");
exports.userProfileAdminSide = async(req, res) => {
	try {
	    const uId = req.params.uId   
	    const fetchUserInfo = await Models.Users.findOne({ where: { id: uId }, attributes: { exclude: ['password'] }, });
	    res.status(200).send({ status: true, message: "User found successfully", data: fetchUserInfo})
  	} catch (err) {
	    console.log(err)
	    res.status(500).send({ status: false, message: "Cannot get user info, an error occurred", data: [],error: err.message })
  	}
}

exports.userList = async(req, res) => {
	try {
	  const userData = await Models.Users.findAll({ 
	  		attributes: { exclude: ['password'] },
		  	where: {
		      id: {
		        [Op.ne]: req.userId, 
		      },
		    }, 
		});
	 	
	  res.status(200).send({
	    status: true,
	    message: "User list found success.",
	    data: userData,
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({
	    status: false,
	    message: "An error occurred while fetching user data.",
	    error: error.message, 
	  });
	}
}

exports.deleteUser = async(req, res) => {
	try
	{
		const userId = req.params.id;	
		const hasRelatedDomains = await Models.Domains.findOne({ where: { user_id: userId } });
		if (hasRelatedDomains) {
			await Models.Domains.destroy({ where: { user_id: userId } });
		}
		const getUserInfo = await Models.Users.findOne({ where: { id: userId } })	  
		if (getUserInfo && getUserInfo.dataValues.profile) {
			unlinkProfile(getUserInfo.dataValues.profile)
		}
		const deleteSetting = await Models.Setting.destroy({ where: { user_id: userId } })
		const deleteUser = await Models.Users.destroy({ where: { id: userId } });		
		if (deleteUser) {
			res.status(200).send({
			  status: true,
			  message: "User deleted successfully.",
			  data: deleteUser,
			});
		} else {
			res.status(200).send({
			  status: false,
			  message: "User not found or something went wrong",
			  data: null,
			});
		}
	} catch(err)
	{
		console.log(err);
		res.status(500).send({ status:false, message: "An error occured while deleteting user, please try again", data: [], error: err.message})
	}
}

exports.createUserAdminSide = async(req, res) => {
	try
	{
		const { email,firstName,lastName,password,phone } = req.body
		const profile = req.file
		const checkUser = await Models.Users.findOne({ where:{ email } })
		if(checkUser && checkUser.dataValues.email)
		{
			return res.status(500).send({ status: false, message: "User already registered", data: [] })
		}
		else
		{
			const hashedPassword = await bcrypt.hash(password,11);
			const userInfo = { email,firstName,lastName,password:hashedPassword,phone,isAdmin:0,email_verified:true }
			if(profile) userInfo.profile = profile.filename

			const addUser = await Models.Users.create(userInfo)
			delete addUser.dataValues.password
			if(addUser)
			{
				res.status(200).send({ status: true, message: "User created success.",data: addUser })
			}
		}
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status:false, message:"User create fail,Please try again.", data:[], error:err.message })
	}
}