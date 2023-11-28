const fs = require("fs")
const Models = require("../models")
const bcrypt = require("bcryptjs")
const path = require("path")
const { unlinkProfile } = require("../utils/deleteFile")

exports.userProfile = async (req, res) => {
  try {
    const uId = req.userId
    const fetchUserInfo = await Models.Users.findOne({ where: { id: uId }, attributes: { exclude: ['password'] }, })    
    res.status(200).send({ status: true, message: "User found successfully", data: fetchUserInfo })
  } catch (err) {
    console.log(err)
    res.status(500).send({ status: false, message: "Cannot get user info, an error occurred", data: [],error: err.message })
  }
}

exports.UpdateProfile = async(req, res) => {
	try
	{
		const uId = req.userId
	    const userData = await Models.Users.findOne({where:{id:uId}})
	    const { firstName, lastName, email,password, phone,postal_code,address,city,country,company,vat_id,bulk_invoice,invoice_email } = req.body

	    if(email == userData.dataValues.email){

	      let userInfo;
	      if (password == "") {
	        userInfo = { firstName, lastName, email, phone,postal_code,address,city,country,company,vat_id,bulk_invoice,invoice_email }
	      }
	      else {
	        const hashedPassword = await bcrypt.hash(password, 11);
	        userInfo = { firstName, lastName,email, password: hashedPassword, phone,postal_code,address,city,country,company,vat_id,bulk_invoice,invoice_email }
	      }
	      const getUserInfo = await Models.Users.findOne({ where: { id: uId } })
	  
	      const userImg = req.file
	      if (userImg) {
	        const fileName = path.basename(`assets/profile/${getUserInfo.dataValues.userImg}`)
	        unlinkProfile(getUserInfo.dataValues.userImg)
	        userInfo.profile = userImg.filename
	      }
	  
	      const updateUser = await Models.Users.update(userInfo, { where: { id: uId } })
	      delete userInfo.password
	    }else{
	      let userInfo;
	      if (password == "") {
	        userInfo = { firstName, lastName, email, phone,postal_code,address,city,country,company,vat_id,bulk_invoice,invoice_email }
	      }
	      else {
	        const hashedPassword = await bcrypt.hash(password, 11);
	        userInfo = { firstName, lastName, email,password:hashedPassword, phone,postal_code,address,city,country,company,vat_id,bulk_invoice,invoice_email }
	      }
	  
	      const getUserInfo = await Models.Users.findOne({ where: { id: uId } })	  
	      const userImg = req.file
	      if (userImg) {
	        const fileName = path.basename(`assets/profile/${getUserInfo.dataValues.userImg}`)
	        unlinkProfile(getUserInfo.dataValues.userImg)
	        userInfo.profile = userImg.filename
	      }	  
	      // email update
	      const checkUser = await Models.Users.findOne({ where: { email } })
	      if (checkUser && checkUser.dataValues.email) {
	          return res.status(409).send({ status: false, message: "This email already registered ", data: [] })
	      }
	      const updateUser = await Models.Users.update(userInfo, { where: { id: uId } })
	      delete userInfo.password
	    }
	    res.status(200).send({ status: true, message: "Profile updated successfully", data: [] })
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Profile Cannot update, an error occurred",data: [], error: err.message })
	}
}

exports.changeEmail = async(req, res) => {
	try
	{
		const uId = req.userId
	    const userData = await Models.Users.findOne({where:{id:uId}})
	    const { email,password } = req.body
	    const isPasswordValid = await bcrypt.compare(password, userData.password);
	    if (!isPasswordValid) {
		  return res.status(401).send({ status: false, message: "Your entered wrong password", data: [] });
		}
		// email update
		const checkUser = await Models.Users.findOne({ where: { email } })
		if (checkUser && checkUser.dataValues.email) {
		  return res.status(409).send({ status: false, message: "The email address has already been taken.", data: [] })
		}		
		userInfo = { email }
		const updateUser = await Models.Users.update(userInfo, { where: { id: uId } })
		return res.status(200).send({ status: true, message: "Email updated successfully. ", data: [] })
	}
	catch(err)
	{
		res.status(500).send({ status: false, message: "Email cannot change, an error occurred.",error:err.message })
	}
}

exports.updateBillingSetting = async(req, res) => {
	try
	{
		const uId = req.userId
		const { bulk_invoice,invoice_email } = req.body
		const checkUser = await Models.Users.findOne({ where: { id:uId } })
		if(checkUser)
		{
			updateData = { bulk_invoice,invoice_email };
			const updateSetting = await Models.Users.update(updateData, { where: { id: uId } })
			res.status(200).send({ status: true, message: "Setting update successfully." })
		}
	}
	catch(err)
	{
		res.status(500).send({ status: false, message: "Setting cannot update, an error occured.", error: err.message })
	}
}

exports.userUpdatePassword = async(req, res) => {
	try
	{
		const uId = req.userId
		const { currentPassword,newPassword } = req.body;
		const userData = await Models.Users.findOne({ where:{ id:uId }})
	    const isPasswordValid = await bcrypt.compare(currentPassword, userData.password);
	    if (!isPasswordValid) {
		  return res.status(401).send({ status: false, message: "Your password does not match your current password", data: [] });
		}
		const newPasswordHash = await bcrypt.hash(newPassword, 11);
		updateData = { password:newPasswordHash }
		const updatePassword = await Models.Users.update(updateData, { where: { id: uId } })
		res.status(200).send({ status: true, message: "Password chnageed successfully." })
	}
	catch(err)
	{
		res.status(500).send({ status: false, message: "Password cannot chnage, an error occured", error: err })
	}
}