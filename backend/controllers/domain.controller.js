const Models = require("../models");
const Sequelize = require('sequelize');

exports.getDomain = async (req, res) => {
    try {
		const domain = await Models.Domains.findAll({
			include: [
			{
			  model: Models.Users, // User model
			  as: 'user', // Alias defined in the Domain model
			  attributes: ['firstName', 'lastName', 'email'],
			},
			{
			  model: Models.domain_category, // domain_category model
			  as: 'category', // Alias defined in the Domain model
			  attributes: ['name', 'description'],
			},
			],
		});

		const domainsData = domain.map((val) => {
		  const domainData = val.dataValues;
		  return domainData;
		});

		res.status(200).send({ status: true, message: "Domain fetched successfully", data: domainsData });
	} catch (err) {
	  console.error(err);
	  res.status(500).send({ status: false, message: "Unable to fetch Domain, Please try again later.", data: [], error: err.message });
	}

};

exports.addDomain = async (req, res) => {
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
		  res.status(500).send({ status: false, message: "Something went wrong, Please try again.", data: [] });
	}
}

exports.deleteDomain = async (req, res) => {
	try
	{
		const { id } = req.params
		const deletedomain = await Models.Domains.destroy({ where : { id }})
		if(deletedomain) res.status(200).send({ status: true, message: "Domain deleted success.", data: deletedomain })
		res.status(500).send({ status: false, message: "This record does not exist or Something went to wrong" })
	}catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Domain failed to delete, Please try again."})
	}
}

exports.getSingleDoimain = async(req, res) => {
	try
	{
		const { id } = req.params
		const domain = await Models.Domains.findOne({
	      where: { id },
	      include: [
	        {
	          model: Models.Users,
	          as: 'user',
	          attributes: ['firstName', 'lastName', 'email'],
	        },
	        {
	          model: Models.domain_category,
	          as: 'category',
	          attributes: ['name', 'description'],
	        },
	      ],
	    });

	    if(domain)
	    {
	    	res.status(200).send({ status: true, message: "Domain fetched success.", data: domain });
	    }
	    else
	    {
	    	res.status(500).send({ status: false, message: "Domain not found or Something went to wrong.", data: domain });
	    }		
	}catch(err)
	{
		console.log(err)
		res.status(500).send({ status: false, message: "Something went to wrong"})
	}
}
exports.editDomain = async(req, res) => {
	try {
		  const user_id = req.userId;
		  const { id } = req.params;
		  const { domain_name, category_id, budget } = req.body;
		  const editData = { domain_name, category_id, budget };
		  const domainPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,}){1,2})(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

		  function extractMainDomain(url) {
		    let mainDomain = url.toLowerCase();

		    if (mainDomain.startsWith("https://")) {
		      mainDomain = mainDomain.replace("https://", "");
		    } else if (mainDomain.startsWith("http://")) {
		      mainDomain = mainDomain.replace("http://", "");
		    }

		    if (mainDomain.startsWith("www.")) {
		      mainDomain = mainDomain.replace("www.", "");
		    }

		    mainDomain = mainDomain.split("/")[0];

		    return mainDomain;
		  }

		  if (domainPattern.test(domain_name)) {
		    const mainDomain = extractMainDomain(domain_name);
		    const existingDomain = await Models.Domains.findOne({
			    where: {
			      [Sequelize.Op.and]: [
			        {
			          domain_name: {
			            [Sequelize.Op.like]: mainDomain,
			          },
			        },
			        {
			          id: {
			            [Sequelize.Op.ne]: id, // Exclude the current ID
			          },
			        },
			      ],
			      user_id: req.userId,
			    },
			  });

		    if (existingDomain) {
		      return res.status(400).send({
		        status: false,
		        message: "A domain with a similar name already exists.",
		      });
		    }

		    // Update the domain if it exists
		    const [updateCount] = await Models.Domains.update(editData, {
		      where: { id },
		    });

		    if (updateCount === 1) {
		      res
		        .status(200)
		        .send({ status: true, message: "Domain updated successfully.",data: updateCount });
		    } else {
		      res
		        .status(500)
		        .send({
		          status: false,
		          message: "Domain not found or something went wrong during update.",
		        });
		    }
		  } else {
		    res.status(400).send({ status: false, message: "Invalid domain name." });
		  }
		} catch (err) {
		  console.error(err);
		  res
		    .status(500)
		    .send({ status: false, message: "Something went wrong." });
		}

}