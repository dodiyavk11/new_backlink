const Models = require('../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const generateUniqueId = require('generate-unique-id');

exports.getDomainBacklinksDetails = async(req , res) => {
	try
	{
		const { hash_id } = req.params;
		const userId = req.userId;
		const getData = await Models.Backlinks.findAll({
			where: { hash_id: hash_id }
		});
		res.status(200).send({ status: true, message: "Backlinks fetch success.", data: getData })
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Backlink fetch failed, Please try again.", data: [], error: err.message });
	}
}

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
		  ],
		}
		const publisherDomainList = await Models.Backlinks.findAll({ where:{ user_id:user_id }, ...baseQuery,order: [['id', 'DESC']] });
		res.status(200).send({ status: true, message: "List fetch successfully.", data: publisherDomainList });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Something went to wrong.", error: err.message });
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
            const existingDomain = await Models.Backlinks.findOne({
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
            const addDomain = await Models.Backlinks.create(addData);

            res.status(200).send({ status: true, message: "Domain added successfully", data: addDomain });            
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
			const existingDomain = await Models.Backlinks.findOne({
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
			const updateDomain = await Models.Backlinks.update(updateData, { where: { id:domainId } });
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
		const deleteDomain = await Models.Backlinks.destroy({ where: id });
		res.status(200).send({ status: true, message: "Domain deleted successfully.",data: deleteDomain });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Domain delete failed.", error: err.message })
	}
}

function extractMainDomain(url) {
	let mainDomain = url.replace(/^https?:\/\//, '');	  
	mainDomain = mainDomain.split("/")[0];
	return mainDomain;
}