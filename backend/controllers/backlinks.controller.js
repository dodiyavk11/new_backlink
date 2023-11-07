const Models = require('../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const generateUniqueId = require('generate-unique-id');
const { sendVerifyMail, emailTemplate } = require("../utils/emailsUtils");
const { Worker, isMainThread } = require('worker_threads');

exports.getPublisherDomainList = async(req, res) => {
	try
	{
		const user_id = req.userId;
		const baseQuery = {
		  include: [
		    {
		      model: Models.domain_category,
		      as: 'category',
		      attributes: ['id','name'],
		    },
		    {
		      model: Models.publisherDomainData,
		      as: 'contentData',
		      // attributes: { exclude: ['updated_at'] }
		    },
		  ],
		}
		const publisherDomainList = await Models.publisherDomain.findAll({ where:{ user_id:user_id }, ...baseQuery,order: [['id', 'DESC']] });
		res.status(200).send({ status: true, message: "List fetch successfully.", data: publisherDomainList });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Something went to wrong.", error: err.message });
	}
}

exports.getPublisherDomain = async(req, res) => {
	try
	{
		const userId = req.userId
		const { domainId } = req.params
		const baseQuery = {
			include: [
				{
					model: Models.domain_category,
					as: "category",
					attributes: ['id','name'],
				},
				{
					model: Models.publisherDomainData,
					as: "contentData",					
				},
			],
		}
		const domainData = await Models.publisherDomain.findOne({ where:{ user_id: userId, id: domainId },...baseQuery });
		res.status(200).send({ status: true, message: "Domain fetch succesfully.", data: domainData });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Something wnet to wrong.", error: err.message });
	}
}

exports.addPublisherDomain = async(req, res) => {
	try
	{
		const { domain_name,category_id,price } = req.body;
		const userId = req.userId;
		const domainPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,}){1,2})(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

		if (domainPattern.test(domain_name)) {        	
            let mainDomain = extractMainDomain(domain_name);        
            mainDomain = mainDomain.trim().replace(/\/+$/, '');            
            const existingDomain = await Models.publisherDomain.findOne({
                where: {
                    domain_name: {
                        [Sequelize.Op.substring]: mainDomain.replace("www",""),
                    },
                    user_id: userId,
                },
            });
            if (existingDomain) {
                return res.status(400).send({
                    status: false,
                    message: "A domain with a similar name already exists.",
                });
            }
            let hash_id = generateUniqueId({
                length: 8,
                useLetters: true
            });

            const domainParts = domain_name.split('.');
		  	const tld = domainParts[domainParts.length - 1];
            const addData = { domain_name: mainDomain, tld, category_id, price, user_id:userId, hash_id };
            const addDomain = await Models.publisherDomain.create(addData);

            /* send publisher notification email to successed added domain */

            const userInfo = await Models.Users.findOne({ where:{ id:userId } });
            let categoryName;
            if(category_id)
            {
            	const category = await Models.domain_category.findOne({ where:{ id:category_id } });
            	categoryName = category.dataValues.name;
            }            

			const mailText = await Models.email_format.findOne({ where: { email_type: "new_domain_added" } });

			let text = mailText.email_content;
			let subject = mailText.header;
			let username = userInfo.dataValues.firstName+' '+userInfo.dataValues.lastName;
			text = text.replace("{username}", username);
			text = text.replace("{domain_name}", domain_name);
			text = text.replace("{price}", price);
			text = text.replace("{category}", categoryName);
			const email = await emailTemplate(text);	
			sendVerifyMail(userInfo.dataValues.email,subject,"",email);

            res.status(200).send({ status: true, message: "Domain added successfully", data: addDomain });     

            if (isMainThread) {
            	const domainId = addDomain.id;
            	const type = "publisher";
				const worker = new Worker('./controllers/domainBackgroundProcesses.js', { workerData: { url: mainDomain, hash_id,domainId,type } });

				worker.on('message', (message) => {
					console.log(message);
				});

				worker.on('error', (error) => {
					console.error(`Worker error: ${error}`);
				});

				worker.on('exit', (code) => {
				if (code !== 0) {
				  console.error(`Worker stopped with exit code ${code}`);
				}
				});
			}
        } else {
            res.status(400).send({
                status: false,
                message: "Invalid domain name."
            });
        }
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: 'Domain add failed.', data: [], error: err.message });
	}
}

exports.editPublisherDomain = async(req, res) => {
	try
	{
		const { domain_name, price, category_id } = req.body;
		const user_id = req.userId;
		const { domainId } = req.params;
		const domainPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,}){1,2})(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
		if(domainPattern.test(domain_name))
		{
			let mainDomain = extractMainDomain(domain_name);
			mainDomain = mainDomain.trim().replace(/\/+$/,'');
			const existingDomain = await Models.publisherDomain.findOne({
				where: {
					domain_name: {
						[Sequelize.Op.substring] : mainDomain.replace("wwww",""),
					},
					user_id:user_id,
					id: {
				      [Op.not]: domainId,
				    },
				}
			})
			if(existingDomain)
			{
				return res.status(400).send({ status: false, message: "A Domain with a similar name already exists."})
			}
			const domainParts = domain_name.split(".");
			const tld = domainParts[domainParts.length - 1];
			const updateData = { domain_name:mainDomain ,category_id, price, tld };
			const updateDomain = await Models.publisherDomain.update(updateData, { where: { id:domainId } });
			res.status(200).send({ status: true, message: "Domain updated successfully.", data: updateDomain })
		}
		else
		{
			res.status(400).send({ status: false, message: "Domain name Invalid." })
		}
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Domain update failed.", error: err.message })
	}

}

exports.deletePublisherDomain = async(req, res) => {
	try
	{
		const id = req.params;
		const deleteDomain = await Models.publisherDomain.destroy({ where: id });
		res.status(200).send({ status: true, message: "Domain deleted successfully.",data: deleteDomain });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Domain delete failed.", error: err.message })
	}
}

exports.getConetentLinks = async(req, res) => {
	try
	{		
		const { category_id,tld,price,language,domain_name } = req.body;

		const filters = {
			'category_id': category_id,
			'tld': tld,
			'price': price,
			'contentData.language': language,
			'domain_name': domain_name
		};
		const baseQuery = {
			include: [
				{
				  model: Models.domain_category,
				  as: 'category',
				  attributes: ['id', 'name'],
				},
				{
				  model: Models.publisherDomainData,
				  as: 'contentData',
				},
			],
		  	where: {},
		};

		if (filters['category_id'] && filters['category_id'].length > 0) {
			baseQuery.where['category_id'] = filters['category_id'];
		}

		if (filters['tld'] && filters['tld'].length > 0) {
			baseQuery.where['tld'] = filters['tld'];
		}

		if (filters['price'] && filters['price'].min && filters['price'].max) {
			baseQuery.where['price'] = {
				[Op.gte]: filters['price'].min,
				[Op.lte]: filters['price'].max,
			};
		}

		if (filters['contentData.language'] && filters['contentData.language'].length > 0) {
			baseQuery.where['$contentData.language$'] = filters['contentData.language'];
		}
		if (filters['domain_name'] !== undefined && filters['domain_name'] !== '')
		{
			baseQuery.where['domain_name'] = {
			    [Op.like]: `%${filters['domain_name']}%`,
			  };
		}
		const contentData = await Models.publisherDomain.findAll({ ...baseQuery,order: [['id', 'DESC']] });
		res.status(200).send({ status: true, message: "Content links get successfully.", data: contentData });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Something went to wrong, Please try again.", data: [] })		;
	}
}

exports.getSingleConetentLinks = async(req, res) => {
	try
	{
		const { hash_id } = req.params;
		const baseQuery = {
			include: [
				{
				  model: Models.domain_category,
				  as: 'category',
				  attributes: ['id', 'name'],
				},
				{
				  model: Models.publisherDomainData,
				  as: 'contentData',
				},
			],
		  	where: {},
		};
		const contentData = await Models.publisherDomain.findOne({ ...baseQuery,where: { hash_id: hash_id },order: [['id', 'DESC']] });
		res.status(200).send({ status: true, data:contentData })
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message:"Something wnet to wrong", error:err.message });
	}
}

function extractMainDomain(url) {
	let mainDomain = url.replace(/^https?:\/\//, '');	  
	mainDomain = mainDomain.split("/")[0];
	return mainDomain;
}