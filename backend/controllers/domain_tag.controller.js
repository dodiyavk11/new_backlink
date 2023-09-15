const Models = require("../models");

exports.getDomainTags = async (req, res) => {
    try {
        const domainTags = await Models.domain_tag.findAll();
        const domainTagsData = domainTags.map((val) => val.dataValues);
        res.status(200).send({ status: true, message: "Domain tags fetched successfully", data: domainTagsData });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: "Unable to fetch Domain tag. Please try again later.", data: [], error: err.message });
    }
};

exports.addDomainTag = async (req, res) => {
	try
	{
		const { name } = req.body
		const addData = { name }
		const addtag = await Models.domain_tag.create(addData)
		res.status(200).send({ status: true, message: "Domain Tag added successfully",data: addtag })
	}
	catch(err){
		console.log(err)
		res.status(500).send({ status: false, message: "Something went to wrong, Please try again.", data: [] })
	}
}

exports.deleteDomainTag = async (req, res) => {
	try
	{
		const { id } = req.params
		const deleteDomainTag = await Models.domain_tag.destroy({ where : { id }})
		if(deleteDomainTag) 
		{
			res.status(200).send({ status: true, message: "Domain Tag deleted success.", data: deleteDomainTag })
		}
		else
		{
			res.status(500).send({ status: false, message: "This record does not exist or Something went to wrong" })
		}
	}catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Domain tag failed to delete, Please try again."})
	}
}

exports.getSingleDomainTag = async(req, res) => {
	try
	{
		const { id } = req.params
		const getData = await Models.domain_tag.findOne({ where: {id} });
		if(getData) res.status(200).send({ status: true, message: "Domain Tag fetched success.", data: getData });
		res.status(500).send({ status: false, message: "Domain Tag not found or Something went to wrong.", data: getData });
	}catch(err)
	{
		console.log(err)
		res.status(500).send({ status: false, message: "Something went to wrong"})
	}
}
exports.editDomainTag = async(req, res) => {
	try
	{
		const { id } = req.params
		const { name } = req.body
		const editData = { name };
		const updateData = await Models.domain_tag.update(editData,{ where: { id } });
		if(updateData==1) 
		{
			res.status(200).send({ status: true, message: "Domain Tag updated successfully.", data: updateData });
		}
		else
		{
			res.status(500).send({ status: false, message: "Domain Tag not found or Something went to wrong.", data: [] });
		}		
	}catch(err)
	{
		console.log(err)
		res.status(500).send({ status: false, message: "Something went to wrong"})
	}
}