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
	    const { firstName, lastName, email,password, phone } = req.body

	    if(email == userData.dataValues.email){

	      let userInfo;
	      if (password == "") {
	        userInfo = { firstName, lastName, email, phone }
	      }
	      else {
	        const hashedPassword = await bcrypt.hash(password, 11);
	        userInfo = { firstName, lastName,email, password: hashedPassword, phone }
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
	        userInfo = { firstName, lastName, email, phone }
	      }
	      else {
	        const hashedPassword = await bcrypt.hash(password, 11);
	        userInfo = { firstName, lastName, email,password:hashedPassword, phone }
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
	          return res.status(409).send({ status: false, message: "User already registered ", data: [] })
	      }
	      const updateUser = await Models.Users.update(userInfo, { where: { id: uId } })
	      delete userInfo.password
	    }
	    res.status(200).send({ status: true, message: "User updated successfully", data: [] })
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Profile Cannot update, an error occurred",data: [], error: err.message })
	}
}

exports.UpdateProfile = async(req, res) => {
	try
	{
		
	}
	catch(err)
	{
		console.log(err)
	}
}