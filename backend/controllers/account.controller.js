const fs = require("fs")
const Models = require("../models")
const bcrypt = require("bcryptjs")
const path = require("path")
const { unlinkProfile } = require("../utils/deleteFile")

exports.userProfile = async (req, res) => {
  try {
    const uId = req.userId
    const fetchUserInfo = await Models.Users.findOne({ where: { id: uId } })
    delete fetchUserInfo.dataValues.password
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

exports.userProfileAdminSide = async(req, res) => {
	try {
	    const uId = req.params.uId   
	    const fetchUserInfo = await Models.Users.findOne({ where: { id: uId } });
	    delete fetchUserInfo.dataValues.password
	    res.status(200).send({ status: true, message: "User found successfully", data: fetchUserInfo})
  	} catch (err) {
	    console.log(err)
	    res.status(500).send({ status: false, message: "Cannot get user info, an error occurred", data: [],error: err.message })
  	}
}
exports.userList = async(req, res) => {
	try {
	  const userData = await Models.Users.findAll();

	  // Remove the 'password' property from each user object
	  const userDataWithoutPassword = userData.map((user) => {
	    const { password, ...userWithoutPassword } = user.dataValues;
	    return userWithoutPassword;
	  });

	  res.status(200).send({
	    status: true,
	    message: "User list found success.",
	    data: userDataWithoutPassword,
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


