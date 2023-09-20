const Models = require("../models");
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
exports.addMessageToOrder = async(req, res) => {
	try
	{
		const userId = req.userId
	    const { order_id } = req.params
	    const { message } = req.body;
	    const image = req.files;
	    const { files } = req.body;
	    if(!message && image.length === 0 ) return res.status(404).send({ status: false, message: "Please send a message or file", data: [] });
	    let chatData = { sender_id: userId, order_id }
	    if (message || message !== "") { chatData.message = message }

	    if (files || files !== "") {
	     
	      if (image) {
	        const array = await Promise.all(image.map(async (val) => {
	          return val.filename
	        }))
	        let string = array.join(',')
	        chatData.files = string
	      }
	    }

	    const data = await Models.Message.create(chatData)
	    res.status(200).send({ status: true, message: "Order message saved success", data: data })
	}
	catch(err)
	{
		res.status(500).send({ status: false, message: "Something went to wrong.", data: [], error:err.message })
	}

}

exports.getOrderMessageByOrderId = async(req, res) => {
	try
	{	
		 const { order_id } = req.params

	    const getMessages = await Models.Message.findAll({ where: { order_id } })

	    const getInfo = await getMessages.map((val) => {
	      delete val.dataValues.order_id
	      return val.dataValues.sender_id
	    })

	    // get user img comment wise
	    const getUserImg = await Promise.all(getInfo.map(async (val) => {
	      const getUserInfo = await Models.Users.findOne({ where: { id: val } ,  paranoid: false})
	      return getUserInfo.dataValues.profile
	    }))

	    // get user name
	    const getUsername = await Promise.all(getInfo.map(async (val) => {
	      const getUserInfo = await Models.Users.findOne({ where: { id: val } ,  paranoid: false})
	      return getUserInfo.dataValues.firstName + " " +getUserInfo.dataValues.lastName
	    }))


	    // adding image to main object
	    getUserImg.map((val, i) => getMessages[i].dataValues.user_profile = val)
	    getUsername.map((val, i) => getMessages[i].dataValues.user_name = val)
	    res.status(200).send({ status: true, message: "Order Message fecthed success", data: getMessages })
	}
	catch(err)
	{
		res.status(500).send({ status: false, message: "Something went to wrong.", data: [], error:err.message })
	}
}