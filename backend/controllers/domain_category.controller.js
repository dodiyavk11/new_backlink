const Models = require("../models");

exports.getDomainCategory = async (req, res) => {
    try {
        const domainCategories = await Models.domain_category.findAll();
        const domainCategoriesData = domainCategories.map((val) => val.dataValues);
        res.status(200).send({ status: true, message: "Domain Categories fetched successfully", data: domainCategoriesData });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: "Unable to fetch Domain Categories. Please try again later.", data: [], error: err.message });
    }
};

exports.addDomainCategory = async (req, res) => {
	try
	{
		const { name } = req.body
		const { description } = req.body
		const addData = { name,description }
		const addcategory = await Models.domain_category.create(addData)
		res.status(200).send({ status: true, message: "Domain Category added successfully",data: addData })
	}
	catch(err){
		console.log(err)
		res.status(500).send({ status: false, message: "Something went to wrong, Please try again", data: [] })
	}
}