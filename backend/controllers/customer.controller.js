const Models = require("../models");
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

exports.dashboard = async(req, res) => {
	try
	{
		const userId = req.userId

		const overview = await Models.Users.findOne({
		  where: { id: userId },
		  include: [
		    {
		      model: Models.Domains,
		      as: 'domains', 
		      limit: 3,
		      order: [['id', 'DESC']], 
		    },
		    {
		      model: Models.UserWallet,
		      as: 'userAccountBalnace',
		      attributes: ['balance'],
		    },
		    {
		      model: Models.UserSubscription,
		      as: 'subscriptions',
		      attributes: ['plan_id','start_date','end_date','cancel_date','info','credits','status'],
		    },
		  ],
		  attributes: { exclude: ['password'] },
		});		
		res.status(200).send({ status:true,message: "User overview", data: overview })
	}
	catch(err)
	{
		res.status(500).send({ status: false, message: "Something went to wrong", data: [], error:err.message })
	}
}

exports.getProjects = async(req, res) => {
	try
	{
		const userId = req.userId;
		const baseQuery = {
		  include: [
		    {
		      model: Models.domain_category,
		      as: 'category',
		    },
		  ],
		}

		const projects = await Models.Domains.findAll({ where: { user_id: userId }, ...baseQuery,  order: [['id', 'DESC']], });
		// Extract domain extensions and add tld in the data
		const customizeProjectData = projects.map((domain) => {
		  const customDomain = { ...domain.get() };
		  if (domain.domain_name) {
		    const domainParts = domain.domain_name.split('.');
		    customDomain.tld = domainParts[domainParts.length - 1];
		  } else {
		    customDomain.tld = '';
		  }
		  return customDomain;
		});
		res.status(200).send({ status: true, message: "Projects fetched successfully", data: customizeProjectData });		
	}	
	catch(err)
	{
		res.status(500).send({ status: false, message: "Something went to wrong", data: [], message:err.message })
	}
}

exports.setting = async (req, res) => {
  try {
    const { q } = req.query;
    const baseQuery = {
      include: [
        {
          model: Models.Users, // User model
          as: 'user', // Alias defined in the Domain model
          attributes: ['firstName', 'lastName', 'email','profile','phone'],
        }
      ],
    };

    const setting = await Models.Setting.findAll(baseQuery);

    const settingsData = setting.map((val) => {
      const settingData = val.dataValues;
      return settingData;
    });

    res.status(200).send({ status: true, message: "Setting fetched successfully", data: settingsData });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: false, message: "Unable to fetch Setting, Please try again later.", data: [], error: err.message });
  }
};


exports.updateNotification = async(req, res) => {
	try {
		const user_id = req.userId;
		const { email_message_received, email_order_accepted, email_order_completed, email_order_created, email_order_declined, email_order_missing_details, email_payment_failed, email_payment_reminder, email_payment_succeeded, email_recommendations_available } = req.body;

		const editData = { email_message_received, email_order_accepted, email_order_completed, email_order_created, email_order_declined, email_order_missing_details, email_payment_failed, email_payment_reminder, email_payment_succeeded, email_recommendations_available };

		const [updateCount] = await Models.Setting.update(editData, { where: { user_id } });
		if (updateCount === 1) {
		  res
		    .status(200)
		    .send({ status: true, message: "Setting updated successfully.",data: updateCount });
		} else {
		  res
		    .status(500)
		    .send({
		      status: false,
		      message: "Setting not found or something went wrong during update.",
		    });
		}

	} catch (err) {
		console.error(err);
		res
		.status(500)
		.send({ status: false, message: "Something went wrong." ,data: [],  error: err.message});
	}
}

exports.addCustomerDomain = async (req, res) => {
	try {
		const { domain_name } = req.body;
		const { category_id } = req.body;
		const { budget } = req.body;
		const user_id = req.userId;

		const domainPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,}){1,2})(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

		function extractMainDomain(url) {
		  let mainDomain = url.toLowerCase();

		  // Remove "https://" or "http://" if present
		  if (mainDomain.startsWith("https://")) {
		    mainDomain = mainDomain.replace("https://", "");
		  } else if (mainDomain.startsWith("http://")) {
		    mainDomain = mainDomain.replace("http://", "");
		  }

		  // Remove "www." if present
		  if (mainDomain.startsWith("www.")) {
		    mainDomain = mainDomain.replace("www.", "");
		  }

		  // Split by "/" and take the first part as the main domain
		  mainDomain = mainDomain.split("/")[0];

		  return mainDomain;
		}

		if (domainPattern.test(domain_name)) {
		  const mainDomain = extractMainDomain(domain_name);
		  const existingDomain = await Models.Domains.findOne({
		    where: {
		      domain_name: {
		        [Sequelize.Op.like]: mainDomain,
		      },
		      user_id: req.userId,
		    },
		  });

		  if (existingDomain) {
		    return res.status(400).send({
		      status: false,
		      message: "A domain with a similar name already exists.",
		    });
		  }

		  const addData = { domain_name: domain_name, category_id, budget, user_id };
		  const addDomain = await Models.Domains.create(addData);

		  res.status(200).send({ status: true, message: "Domain added successfully", data: addDomain });
		} else {
		  res.status(400).send({ status: false, message: "Invalid domain name." });
		}
	} catch (err) {
		  console.error(err);
		  res.status(500).send({ status: false, message: "Something went wrong, Please try again.", data: [], error: err.message });
	}
}

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

exports.transactionHistory = async(req, res) =>
{
	try
	{
		const userId = req.userId;

		const userTransaction = await Models.Transactions.findAll({
			where: { user_id:userId },
			// include: [
			// 	{
			// 		model: Models.Transactions,
			// 	    as: 'transaction',
			// 	}
			// ],
			// attributes: { exclude: ['password'] },
			order: [['id', 'DESC']],
			// order: [[{ model: Models.Transactions, as: 'transaction'}, 'id', 'DESC' ]]
		});
		res.status(200).send({ status: true, message: "User Transaction fecth successfully.",data: userTransaction });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Something went to wrong.",data: [], error: err.message })
	}
}