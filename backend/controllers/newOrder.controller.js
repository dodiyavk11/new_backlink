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
		const orderfile = req.files;
		const getPublisher = await getPublisherData(null,hash_id);		
		const publisher_id = getPublisher.user_id;
		const domain_id = getPublisher.id;
		const linkPrice = await getBacklinksPrice(domain_id);
		const total_price = linkPrice.price;
		const status = "Placed";
		const orderData = { publisher_id, customer_id, domain_id, status, total_price,anchortext, linktarget, publication_date, note, project_id, hash_id };

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
		const admin = await Models.Users.findAll({ where: { isAdmin: 1 } });
		const mailTexts = await Models.email_format.findOne({
	      where: { email_type: "create_new_order" },
	    }); 

	    let text = mailTexts.email_content;
	    let subject = mailTexts.header;
	    text = text.replace("{order_name}", getPublisher.domain_name);
	    text = text.replace(
	      "{name}",
	      checkUser.dataValues.firstName + " " + checkUser.dataValues.lastName
	    );
	    const mail = await emailTemplate(text);
	    admin.map((val) => {
	      sendVerifyMail(val.dataValues.email, subject, "", mail);
	    });

	    res.status(200).send({ status: true, message: "Order placed successfully", data: placeOrder});
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Something went to wrong",error: err.message });
	}
}

async function getPublisherData(domain_id=null,hash_id=null)
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

async function getBacklinksPrice(domain_id)
{
	try
	{
		let backlinkPrice;
		if(domain_id)
		{
			backlinkPrice = await Models.backlinksDetails.findOne({ where:{ domain_id:domain_id } });
		}				
		return backlinkPrice;
	}
	catch(err)
	{
		console.log(err);
		return false;
	}
}