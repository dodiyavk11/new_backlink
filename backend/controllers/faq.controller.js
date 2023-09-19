const Models = require("../models");
const Sequelize = require('sequelize');

exports.addFaq = async (req, res) => {
	try {
		const { question } = req.body;
		const { answer } = req.body;
		const { status } = req.body;

		const addData = { question, answer, status };
		const addFaq = await Models.Faqs.create(addData);

		res.status(200).send({ status: true, message: "FAQ added successfully", data: addFaq });	
	} catch (err) {
		  console.error(err);
		  res.status(500).send({ status: false, message: "Something went wrong, Please try again.", data: [], error: err.message});
	}
}

exports.listFaq = async(req, res) => {
	try
	{
		const getFaq = await Models.Faqs.findAll()
		res.status(200).send({ status: true, message: "Faqs fecthed successfully.", data: getFaq })
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status:false, message: "Something went to wrong, Please Try again.", data: [], error: err.message })
	}
}

exports.getFaq = async(req, res) => {
	try
	{
		const { id } = req.params
		const getFaq = await Models.Faqs.findOne({ where:{ id:id }});
		if(getFaq)
		{
			res.status(200).send({ status:true, message: "FAQ get Success.", data: getFaq });
		}		
		else
		{
			res.status(500).send({ status:false, message: "FAQ not found", data: [] });
		}
	} catch
	{
		res.status(500).send({ status: false, "message": "Something went to wrong, Please try again", data: [], error: err.message })
	}
}

exports.updateFaq = async(req, res) => {
	try
	{
		const { id } = req.params;
		const { question } = req.body
		const { answer } = req.body 
		const { status } = req.body 
		const updateData = { question,answer,status }

		const update = await Models.Faqs.update(updateData, { where: { id:id }})
		if(update == 1)
		{
			res.status(200).send({ status: true, message: "FAQ updated successfully.", data: update })
		}
		else
		{
			res.status(500).send({ status:false, message: "FAQ not found or Something went to  wrong.", data:[] })
		}
	}
	catch(err)
	{
		console.log(err)
		res.status(500).send({ status:false, message: "Something went to wrong, Please try again.", data: [], error: err.message })
	}
}

exports.deleteFaq = async(req,res) => {
	try
	{
		const { id } = req.params;
		const deleteFaq = await Models.Faqs.destroy({ where:{ id:id }})
		if(deleteFaq)
		{
			res.status(200).send({ status: true, message: "FAQ deleted successfully.", data: deleteFaq })
		}
		else
		{
			res.status(500).send({ status:false, message: "FAQ not found or Something went to wrong, Please try again", data: [] })
		}
	}
	catch(err)
	{
		console.log(err)
		res.status(500).send({ status: false, message: "Something went to wrong, Please try again.", data: [], error:err.message })
	}
}