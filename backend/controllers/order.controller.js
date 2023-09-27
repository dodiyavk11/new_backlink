const Models = require("../models");
const { Op } = require("sequelize");
const path = require("path");
const { deleteOrderFile } = require("../utils/deleteFile");
const { sendVerifyMail, emailTemplate } = require("../utils/emailsUtils");
var fs = require("fs");

exports.addOrder = async (req, res) => {
  try {
    const checkId = req.userId;
    const checkUser = await Models.Users.findOne({ where: { id: checkId } });
    const admin = await Models.Users.findAll({ where: { isAdmin: 1 } });
    let customer_id;
    if (checkUser.isAdmin == 0) {
      customer_id = req.userId;
    } else {
      customer_id = Number(req.body.customer_id);
    }
    const {
      ordername,
      orderpriority,
      description,
      orderstatus
    } = req.body;
    const orderInfo = {
      customer_id,
      ordername,
      orderpriority,
      description,
      orderstatus
    };

    const orderfile = req.files;
    const name = req.body.name;

    const addOrder = await Models.Orders.create(orderInfo);
    if (orderfile) {
	  orderfile.map(async (val, i) => {
	    try {
	      await Models.orderFiles.create({
	        order_id: addOrder.dataValues.id,
	        file_name: val.filename,
	        original_name: name[i],
	        file_path: 'assets/order_assets/',
	      });	      
	    } catch (err) {
	      console.error("Error creating record in the database:", err);
	    }
	  });
	}
    
    const mailTexts = await Models.email_format.findOne({
      where: { email_type: "create_new_order" },
    }); 

    let text = mailTexts.email_content;
    let subject = mailTexts.header;
    text = text.replace("{order_name}", ordername);
    text = text.replace(
      "{name}",
      checkUser.dataValues.firstName + " " + checkUser.dataValues.lastName
    );
    const mail = await emailTemplate(text);
    admin.map((val) => {
      sendVerifyMail(val.dataValues.email, subject, "", mail);
    });
    res.status(200).send({ status: true, message: "Order added successfully", data: addOrder});
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: "Order cannot be added, an error has occurred", data: [], error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const user_id = req.userId;
    const getAllOrderData = await Models.Orders.findAll();

    res.status(200).send({ status: true, message: "Orders fetched successfully", data: getAllOrderData });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: "Order cannot be retrieved, an error has occurred", data: [], error: err.message });
  }
};

exports.getOrderByUserId = async(req, res) => {
	try
	{
		const user_id = req.userId
	    const getAllOrderByUser = await Models.Orders.findAll({
	      where: { customer_id:user_id },
	      order: [
	        ["orderpriority", "DESC"],
	        ["orderstatus", "ASC"],
	        ["created_at", "DESC"],
	      ],
	    });

	    const priority = [1, 0];
	    const status = [2, 1, 3];

	    const filterComboArr = [];

	    status.map((val, i) => {
	    	return priority.map((val2, i2) => {
	    		filterComboArr.push([val, val2]);
	      });
	    });

	    const finalData = filterComboArr.map((val, i) => {
	    	return getAllOrderByUser.filter((innerVal, i) => {
	    		return (
	          		innerVal.orderstatus === val[0] && innerVal.orderpriority === val[1]
	        	);
	    	});
	    });

	    finalData.map((val) => {
	    	val.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
	    });

	    const allDoneOrders = finalData.map((val) => {
	    	const DoneOrders = val.filter((innerVal) => innerVal.orderstatus === 3);
	    	const WithoutDoneOrders = val.filter((innerVal) => innerVal.orderstatus !== 3);
	    	return WithoutDoneOrders.concat(DoneOrders.reverse())
	  	})

	    const finalSortData = allDoneOrders.flat(Infinity);

	    res.status(200).send({ status: true, message: "Order fetched successfully", data: finalSortData });
	}
	catch(err){
		console.log(err);
		res.status(500).send({ status: false, message: "Order cannot be retrieved, an error has occurred.", data: [], error: err.message });
	}
}

exports.getOrderByOrderId = async(req, res) => {
	try
	{
		const { order_id } = req.params;
		const user_id = req.userId;
		const orderData = await Models.Orders.findOne({ order_id });

		const files = [];
	    const getOrderFiles = await Models.orderFiles.findAll({
	      where: { order_id: order_id },
	    });

	    getOrderFiles && getOrderFiles.map((val) => {
	    	files.push(val.dataValues);
	    });
	    orderData.dataValues.files = files;

	    const getUser = await Models.Users.findOne({
	      where: { id: orderData.dataValues.customer_id },
	    });
	    orderData.dataValues.user_name = getUser.dataValues.firstName+' '+getUser.dataValues.lastName;

	    const checkUserRole = await Models.Users.findOne({ where: { id: user_id } });

	    checkUserRole.isAdmin === 0 &&
	      ( await Models.Orders.update({ update_status: 0 }, { where: { id:order_id } }) );
	    checkUserRole.isAdmin !== 0 &&
	      ( await Models.Orders.update({ update_status_admin: 1 },{ where: { id:order_id } }) );

		res.status(200).send({ status: true, message: "Order fetched successfully.", data: orderData })
	}
	catch(err)
	{
		console.log();
		res.status(500).send({ status: false, message: "Order cannot be retrieved, an error has occurred", data: [], error:err.message })
	}
}

exports.updateOrder = async(req, res) => {
	try
	{
		const user_id = req.userId;
	    const getUser = await Models.Users.findOne({ where: { id: user_id } });
	    const name = req.body.name;
	    let getUser_id;
	    if (getUser.isAdmin == 0) {
	    	getUser_id = req.userId;
	    } else {
	    	getUser_id = Number(req.body.user_id);
	    }

	    const order_id = req.params.order_id;
	   	const { ordername, orderpriority, description, orderstatus } = req.body;
	    const orderInfo = { ordername, orderpriority, description, orderstatus };

	    const orderfile = req.files;

	    if (orderfile) {
			orderfile.map(async (val, i) => {
				Models.orderFiles.create({
				  order_id: order_id,
				  file_name: val.filename,
				  original_name: name[i],
				  file_path: 'assets/order_assets/',
				});				
			});
	    }

	    getUser.isAdmin !== 0 &&
	      ( await Models.Orders.update({ update_status: 1 },{ where: { id: order_id } }) );
	    getUser.isAdmin === 0 &&
	      ( await Models.Orders.update({ update_status_admin: 1 },{ where: { id: order_id } }) );

	    const updateOrder = await Models.Orders.update(orderInfo, {
	      where: { id: order_id },
	    });

	    res.status(200).send({ status: true, message: "Order updated successfully ", data: updateOrder });
	}
	catch(err)
	{
		console.log(err)
		res.status(500).send({ status: false, message: "Order cannot be updated, an error has occurred.", data: [], error:err.message });
	}
}

exports.deleteOrderFile = async(req, res) => {
	try
	{
		const { filename } = req.body;
		const fileDelete = await Models.orderFiles.destroy({ where:{ file_name:filename } });
		if(fileDelete)
		{
			deleteOrderFile(filename)
		}
		else
		{
			res.status(500).send({ status: false, message: "File deleting fail.", data: [] })
		}
		res.status(200).send({ status: true, message: "File deleted successfully",data: fileDelete })
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "File cannot be deleted, an error has occurred.",data: [], error:err.message })
	}
}

exports.deleteOrder = async(req, res) => {
	try
	{
		const { order_id } = req.params;
		// if order deleted success auto deleted order files related this order
		const deleteOrder = await Models.Orders.destroy({ where:{ id:order_id} });
		if(!deleteOrder)
		{
			res.status(500).send({ status: false, message: "Order deleting fail.", data: [] })
		}
		res.status(200).send({ status: true, message: "Order deleted successfully.", data: deleteOrder })
	}
	catch(err)
	{
		console.log(err)
		res.status(500).send({ status: false, message: "Order cannot be deleted, an error has occurred.", data: [], error: err.message })
	}
}

exports.addOrderFile = async(req, res) => {
	try{
		const { order_id } = req.params;
		const files = req.files;
    	const name = req.body.name;
		const orderFile = files.length > 0 && files.map((val,key) => {
			return Models.orderFiles.create({ order_id: order_id, file_name: val.filename, original_name: name[key], file_path : 'assets/order_assets/' });		
		})		
		await Models.Orders.update({ update_status: true }, {where: { id:order_id } })
		const createdOrderFiles = await Promise.all(orderFile);
		res.status(200).send({ status: true, message: "File uploaded successfully.", data: createdOrderFiles })
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status:false, message: "File cannot be uploaded, an error has occurred",data: [], error: err.message })
	}
}

exports.getOrderFile = async (req, res) => {
	try
	{
		const { order_id } = req.params;
		const orderFiles = await Models.orderFiles.findAll({ where:{ order_id:order_id } });
		res.status(200).send({ status: true, message: "Order file get successfully.", data: orderFiles });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: true, message: "File cannot be retrieved, an error has occurred", data: [], error: err.message })
	}
}

exports.deleteOrderFinalFile = async(req, res) => {
	try
	{
		const { id } = req.params;
		const { name } = req.body;
		const fileDelete = await Models.orderFiles.destroy({ where:{ id }});
		deleteOrderFile(name)
		res.status(200).send({ status: true, message: "Final file deleted successfully.", data: fileDelete })
	}
	catch(err)
	{
		console.log(err)
		res.status(500).send({ status: true, message: "Final file cannot be deleted, an error occurred.", data: [], error:err.message })
	}
}

exports.updateOrderStatus = async(req, res) => {
	try
	{
		const { order_id } = req.params;
		const { orderstatus } = req.body;
		const user_id = req.userId
		const getOrderUserId = await Models.Orders.findOne({ where: { id:order_id } });
		const getOrderUserData = await Models.Users.findOne({ where: { id:getOrderUserId.dataValues.customer_id } })
		let ordername = getOrderUserId.dataValues.ordername;
		const mailText = await Models.email_format.findOne({ where: { email_type: "order_status" } });
		let text = mailText.email_content;
		let subject = mailText.header;
		text = text.replace("{order_name}", ordername);
		let email = {}
		if(orderstatus == 1)
		{
			text = text.replace("{order_status}","New Order");			
		}
		if(orderstatus == 3)
		{
			text = text.replace("{order_status}","Completed");
		}

		if(orderstatus == 1 || orderstatus == 3)
		{
			email = await emailTemplate(text);			
			sendVerifyMail(getOrderUserData.dataValues.email,subject,"",email);
		}
		const updateOrderStatus = await Models.Orders.update({ orderstatus },{ where: { id:order_id } });
		getOrderUserData.isAdmin !== 0 && ( await Models.Orders.update({ update_status: true },{ where: { id: order_id } } ));

		res.status(200).send({ status: true, message: "Order status Update successfully.",data: updateOrderStatus })
	}
	catch(err)
	{
		console.log(err)
		res.status(500).send({ status: true, message: "Order status update cannot be update, an error occurred.", data: [],  error: err.message })
	}
}

exports.addOrderCloundLinks = async(req, res) => {
	try
	{
		const { order_id } = req.params;
		const { cloud_links } = req.body;
		if(!cloud_links || cloud_links.length===0)
		{
			return res.status(400).send({ status: false, message: "Please add link", data: [] });
		}
		const links = await Promise.all(
		  cloud_links.map(async (linkObj) => {
		    try {
		      if (linkObj.link) {
		        const createdLink = await Models.orderFiles.create({
		          order_id: order_id,
		          isLink: true,
		          link: linkObj.link,
		          original_name: linkObj.link_name,
		        });
		        return createdLink;
		      }
		    } catch (error) {
		      console.error("Error creating link:", error);
		    }
		  })
		);		
		res.status(200).send({ status: true, message: "Link added successfully.", data: links })
	}
	catch(err)
	{
		console.log(err)
		res.status(500).send({ status: false, message: "Cloud link cannot be added, an error occurred.", data: [], error: err.message });
	}
}

exports.updateOrderCloundLinks = async(req, res) => {
	try
	{
		const { id } = req.params;
		const { cloud_links,link_name } = req.body;
		if(!cloud_links || !link_name)
		{
			return res.status(400).send({ status: false, message: "Please add link or add link name" })
		}
		const checkIsLink = await Models.orderFiles.findOne({ where:{ id:id,isLink:true } })
		if(checkIsLink)
		{
			const updateData = await Models.orderFiles.update({ link:cloud_links,original_name:link_name },{ where:{ id:id } });
			res.status(200).send({ status: true, message: "Cloud link updated successfully.", data: updateData })
		}	
		else
		{
			return res.status(400).send({ status: false, message: "This is not a link" })
		}	
	}
	catch(err)
	{
		console.log(err)
		res.status(500).send({ status: false, message: "Cloud link cannot be updated, an error occurred.", data: [], error: err.message })
	}
}

exports.deleteCloudLinks = async(req, res) => {
	try
	{
		const { id } = req.params
		const checkIsLink = await Models.orderFiles.findOne({ where:{ id: id, isLink: true} });
		if(checkIsLink)
		{
			const deleteData = await Models.orderFiles.destroy({ where:{ id:id } });
			res.status(200).send({ status: true, message: "Cloud link deleted successfully.", data: deleteData })
		}
		else
		{
			return res.status(400).send({ status: false, message: "This is not a link.", data: [] });
		}
	}
	catch(err)
	{
		console.log(err)
		res.status(500).send({ status: true, message: "Cloud link cannot be deleted, an error occurred.",data:[], error: err.message })
	}
}