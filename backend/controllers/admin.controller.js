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
		const id = req.params.id;	
		const isDeleted = req.params.isDeleted;
		// const hasRelatedDomains = await Models.Domains.findOne({ where: { user_id: userId } });
		// if (hasRelatedDomains) {
		// 	await Models.Domains.destroy({ where: { user_id: userId } });
		// 	const domainIds = await Models.Domains.findAll({
		//       attributes: ['id'],
		//       where: { user_id: userId },
		//       raw: true,
		//     }).map(domain => domain.id);

		//     await Models.customerDomainData.destroy({ where: { domain_id: domainIds } });
		//     await Models.Domains.destroy({ where: { user_id: userId } });
		//     await Models.newOrder.destroy({ where: { customer_id: userId } });
		// }
		// const getUserInfo = await Models.Users.findOne({ where: { id: userId } })	  
		// if (getUserInfo && getUserInfo.dataValues.profile) {
		// 	unlinkProfile(getUserInfo.dataValues.profile)
		// }
		// const deleteSetting = await Models.Setting.destroy({ where: { user_id: userId } })
		// const deleteUser = await Models.Users.destroy({ where: { id: userId } });		
		const updateUser = await Models.Users.update({ isDeleted }, { where: { id } });
		res.status(200).send({
			  status: true,
			  message: "User Blocked successfully.",
			  data: updateUser,
			});		
	} catch(err)
	{
		console.log(err);
		res.status(500).send({ status:false, message: "An error occured while deleteting user, please try again", data: [], error: err.message})
	}
}

exports.createUserAdminSide = async(req, res) => {
	try
	{
		const { email,firstName,lastName,password,phone,type } = req.body
		const profile = req.file
		const checkUser = await Models.Users.findOne({ where:{ email } })
		if(checkUser && checkUser.dataValues.email)
		{
			return res.status(500).send({ status: false, message: "User already registered with this email", data: [] })
		}
		else
		{
			const hashedPassword = await bcrypt.hash(password,11);
			const userInfo = { email,firstName,lastName,password:hashedPassword,phone,isAdmin:type,email_verified:true }
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

exports.adminToUpdateuser = async(req, res) => {
	try
	{
		const { firstName,lastName,phone,id } = req.body
		const userInfo = { firstName, lastName, phone }		
		const updateUser = await Models.Users.update(userInfo, { where: { id } });
		res.status(200).send({ status: true, message: "User update successfully.",data: [] });
	}
	catch(err)
	{
		res.status(500).send({ status: false, message: "User profile can not update, an error occured." })
	}
}