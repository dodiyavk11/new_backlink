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
		res.status(500).send({ status: false, message: "Something went to wrong, Please try again.", data: [] })
	}
}

exports.deleteDomainCategory = async (req, res) => {
	try
	{
		const { id } = req.params
		const deleteCategory = await Models.domain_category.destroy({ where : { id }})
		if(deleteCategory) res.status(200).send({ status: true, message: "Domain Category deleted success.", data: deleteCategory })
		res.status(500).send({ status: false, message: "This record does not exist or Something went to wrong" })
	}catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Domain category failed to delete, Please try again."})
	}
}

exports.getSingleDoimainCategory = async(req, res) => {
	try
	{
		const { id } = req.params
		const getData = await Models.domain_category.findOne({ where: {id} });
		if(getData) res.status(200).send({ status: true, message: "Domain Category fetched success.", data: getData });
		res.status(500).send({ status: false, message: "Domain Category not found or Something went to wrong.", data: getData });
	}catch(err)
	{
		console.log(err)
		res.status(500).send({ status: false, message: "Something went to wrong"})
	}
}
exports.editDomainCategory = async(req, res) => {
	try
	{
		const { id } = req.params
		const { name,description } = req.body
		const editData = { name,description };
		const updateData = await Models.domain_category.update(editData,{ where: { id } });
		if(updateData==1) res.status(200).send({ status: true, message: "Domain Category updated successfully.", data: updateData });
		res.status(500).send({ status: false, message: "Domain Category not found or Something went to wrong.", data: [] });
	}catch(err)
	{
		console.log(err)
		res.status(500).send({ status: false, message: "Something went to wrong"})
	}
}