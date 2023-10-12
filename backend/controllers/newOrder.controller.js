const Models = require("../models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { sendVerifyMail, emailTemplate } = require("../utils/emailsUtils");

exports.addNewOrder = async(req, res) => {
	try
	{
		const customer_id = req.userId;
		const checkUser = await Models.Users.findOne({ where: { id: customer_id } });
		const { anchortext,linktarget,publication_date,note,project_id,hash_id } = req.body;
		const userBalance = await checkUserBalance(customer_id,hash_id);
		if(userBalance)
		{
			const orderfile = req.files;
			const getPublisherDomain = await getPublisherDomainData(null,hash_id);		
			const publisher_id = getPublisherDomain.user_id;
			const domain_id = getPublisherDomain.id;
			const backlinkData = await getBacklinksData(domain_id);
			const backlink_id = backlinkData.id;
			const total_price = getPublisherDomain.price;
			const status = "Pending";
			const orderData = { publisher_id, customer_id, domain_id, backlink_id, status, total_price,anchortext, linktarget, publication_date, note, project_id, hash_id };

			const placeOrder = await Models.newOrder.create(orderData);
		    if (orderfile) {
			  orderfile.map(async (val, i) => {
			    try {
			      await Models.orderFiles.create({
			        order_id: placeOrder.dataValues.id,
			        file_name: val.filename,
			        // original_name: name[i],
			        file_path: 'assets/order_assets/',
			      });	      
			    } catch (err) {
			      console.error("Error creating record in the database:", err);
			    }
			  });
			}
			const deduct = await deductFromWallet(customer_id,total_price,"deduct");
			if(placeOrder && deduct)
			{
				const transaction_type = "Place order";
				const description = "Buy backlins "+getPublisherDomain.domain_name;
				const now = new Date();

				const year = now.getFullYear();
				const month = String(now.getMonth() + 1).padStart(2, '0');
				const day = String(now.getDate()).padStart(2, '0');
				const hours = String(now.getHours()).padStart(2, '0');
				const minutes = String(now.getMinutes()).padStart(2, '0');
				const seconds = String(now.getSeconds()).padStart(2, '0');

				const payment_created = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
				const transaction_id = 'order_'+placeOrder.dataValues.id;
				const status = "paid";
				const tranInfo = {
					user_id: customer_id,
					amount: total_price,
					transaction_type: transaction_type,
					description: description,
					payment_created: payment_created,
					transaction_id: transaction_id,
					status: status,
					paymentData: placeOrder
				};

				const addTrans = await Models.Transactions.create(tranInfo);
			}
			const admin = await Models.Users.findAll({ where: { isAdmin: 1 } });
			const mailTexts = await Models.email_format.findOne({
		      where: { email_type: "create_new_order" },
		    }); 

		    let text = mailTexts.email_content;
		    let subject = mailTexts.header;
		    text = text.replace("{order_name}", getPublisherDomain.domain_name);
		    text = text.replace(
		      "{name}",
		      checkUser.dataValues.firstName + " " + checkUser.dataValues.lastName
		    );
		    const mail = await emailTemplate(text);
		    admin.map((val) => {
		      sendVerifyMail(val.dataValues.email, subject, "", mail);
		    });

		    return res.status(200).send({ status: true, message: "Order placed successfully", data: placeOrder});
		}
		res.status(400).send({ status: false, message: "Insufficient balance", error: "Insufficient balance" });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Something went to wrong",error: err.message });
	}
}
/* customer cancel order */
exports.cancelOrder = async(req, res) => {
	try{
		const user_id = req.userId;
		const { orderId } = req.params;
		const checkStatus = await Models.newOrder.findOne({
			where: {
			    [Op.and]: [
					{ id: orderId },
      				{ status: 'Pending' },
      				{ customer_id: user_id },
			    ]
			  }
		});
		if(checkStatus)
		{			
			const refund = await deductFromWallet(user_id,checkStatus.total_price,"refund");

			const domainData = await getPublisherDomainData(checkStatus.domain_id,null);
			console.log(domainData)
			const transaction_type = "Cancel order refund";
			const description = "Cancel backlink "+domainData.domain_name;
			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0');
			const day = String(now.getDate()).padStart(2, '0');
			const hours = String(now.getHours()).padStart(2, '0');
			const minutes = String(now.getMinutes()).padStart(2, '0');
			const seconds = String(now.getSeconds()).padStart(2, '0');			
			const payment_created = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			const transaction_id = 'cancel_order_'+checkStatus.id;
			const statusT = "refunded";

			const tranInfo = {
				user_id,
				amount: checkStatus.total_price,
				transaction_type: transaction_type,
				description: description,
				payment_created: payment_created,
				transaction_id: transaction_id,
				status: statusT,
				paymentData: checkStatus
			};

			const addTrans = await Models.Transactions.create(tranInfo);
			checkStatus.status = "Cancelled";
			await checkStatus.save();

			const customer = await Models.Users.findByPk(user_id);

			/* send mail to customer */
			const mailTexts = await Models.email_format.findOne({
		      where: { email_type: "order_cancel" },
		    }); 

		    let text = mailTexts.email_content;
		    let subject = mailTexts.header;
		    text = text.replace("{order_name}", domainData.domain_name);
		    text = text.replace("{order_status}", "Cancelled");
		    text = text.replace("{amount}", checkStatus.total_price);
		    text = text.replace(
		      "{name}",
		      customer.firstName + " " + customer.lastName
		    );
		    const mail = await emailTemplate(text);
		    console.log(mail)
		    sendVerifyMail(customer.email, subject, "", mail);
			return res.status(200).send({ status: true, message: "Your order has been Cancelled successfully,and Rs."+checkStatus.total_price+" refunded in your wallet.", data: checkStatus })

		}
		return res.status(400).send({ status: false, message: "You can not cancel this Order.",error: "You can not cancel this Order." })
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Something went to wrong.", error: err.message })
	}
}
/* publisher get their backlink(domain) order placed by customer */
exports.getPublisherOrder = async(req, res) => {
	try{

		const publisher_id = req.userId;
		const orderData = await Models.newOrder.findAll({
			include: [
				{
				  model: Models.publisherDomain,
				  as: 'domain',
				},
				{
				  model: Models.Users,
				  as: 'customer',
				  attributes: { exclude: ['password','isAdmin','created_at','updated_at','email_verified'] }
				},
			],
		  	where: { publisher_id: publisher_id },
		})
		res.status(200).send({ status: true, message: "Order fetch successfully.", data: orderData })
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Something went to wrong.", error: err.message });
	}
}
/* publisher update order status for their backlink(domain) order placed by customer */
exports.publisherUpdateOrderStatus = async(req, res) => {
	try
	{
		const { orderId } = req.params;
		const { status } = req.body;
		const orderData = await Models.newOrder.findByPk(orderId);
		if(!orderData)
		{
			return res.status(404).send({ status: false, message: "Order not found." });
		}
		orderData.status = status;
		await orderData.save();
		const customer = await Models.Users.findByPk(orderData.customer_id);
		const purchasedDomain = await Models.publisherDomain.findByPk(orderData.domain_id);

		/* send mail to customer */
		const mailTexts = await Models.email_format.findOne({
	      where: { email_type: "order_status" },
	    }); 

	    let text = mailTexts.email_content;
	    let subject = mailTexts.header;
	    text = text.replace("{order_name}", purchasedDomain.domain_name);
	    text = text.replace("{order_status}", status);
	    text = text.replace(
	      "{name}",
	      customer.firstName + " " + customer.lastName
	    );
	    const mail = await emailTemplate(text);
	    sendVerifyMail(customer.email, subject, "", mail);

		res.status(200).send({ status: true, message: "Order status update successfully.", data: orderData });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Something wnet to wrong, Please try again.", error: err.message });
	}
}

async function getPublisherDomainData(domain_id=null,hash_id=null)
{
	try
	{
		let publisherData;
		if(domain_id)
		{
			publisherData = await Models.publisherDomain.findOne({ where:{ id:domain_id } });
		}		
		else if(hash_id)
		{
			publisherData = await Models.publisherDomain.findOne({ where:{ hash_id:hash_id } });
		}
		return publisherData;
	}
	catch(err)
	{
		console.log(err);
		return false;
	}
}

async function getBacklinksData(domain_id)
{
	try
	{
		let backlinkPrice;
		if(domain_id)
		{
			backlinkPrice = await Models.backlinksDetails.findOne({ where:{ domain_id:domain_id } });
			return backlinkPrice;
		}				
	}
	catch(err)
	{
		console.log(err);
		return false;
	}
}

async function checkUserBalance(user_id,hash_id)
{
	try
	{		
		const userBalance = await Models.UserWallet.findOne({
			where: { user_id }
		})		
		if(userBalance)
		{						
			const orderPrice = await Models.publisherDomain.findOne({ where:{ hash_id:hash_id } });	
			const balance = parseFloat(userBalance.balance);
      		const price = parseFloat(orderPrice.price);
			if (balance >= price)
			{
				return true;
			}			
		}
		return false
	}
	catch(err)
	{
		console.log(err);
		return false;
	}
}

async function deductFromWallet(user_id,amount,type)
{
	try
	{
		const userWallet = await Models.UserWallet.findOne({ where: { user_id: user_id } });
		const currentBalance = parseFloat(userWallet.balance);
		let newBalance;
		if(type === "deduct")
		{
			newBalance = currentBalance - parseFloat(amount);
		}		
		if(type === "refund")
		{
			newBalance = currentBalance + parseFloat(amount);
		}
  		const updateOnfo = { balance:newBalance }
       	const walletInfoData = await Models.UserWallet.update(updateOnfo, {
			      where: { user_id: user_id },
			    });
        if (walletInfoData) 
        {
        	return true;
        }
        return false;
	}
	catch(err)
	{
		return false;
		console.log(err)
	}
}