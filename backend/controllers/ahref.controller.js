const Models = require("../models");
const Sequelize = require('sequelize');
const ahrefs = require('ahrefs')({ token: '39e2a384240099a388dc58c63c17f7a7cc8db6a0' });

exports.getBacklinksForDomain = async(req, res) => {
	try
	{
		const { domain } = req.params
		const query = ahrefs.newQuery()
			.target(domain)
			.mode('domain')
			.output('json')
			.from('backlinks')
			.limit(10)
			.offset(5);
		const result = ahrefs.get(query, function(err, result) {
			if (err) {
				res.status(500).send({ status: false, message: "Domain backlinks fecthed fail.", data: result, error: err })
			} else {
				res.status(200).send({ status: true, message: "Domain backlinks fecthed success.", data: result })
			}
		});		
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status:false, message: "Something went to wrong.", data: [], error: err.message })
	}
}