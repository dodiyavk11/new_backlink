const Models = require("../models");
const Sequelize = require("sequelize")

exports.addSubscriptionPlan = async(req, res) => {
	try
	{
		const { name, description, price, cancellation_period, max_domains_per_month, max_orders, status } = req.body;
		let isValid = fieldValidation(req.body);
		if (isValid.isTrue) 
		{
			const planInfo = { name, description, price:parseFloat(price), cancellation_period, max_domains_per_month, max_orders, status };		  
			const addData =  await Models.SubscriptionPlans.create(planInfo);			
			res.status(200).send({ status: true, message: "Subscription Plan added successfully.", data:addData });
		} else {
			res.status(400).send({ status: false, message: "All fields are required.", field: isValid.requiredFields });
		}
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Subscription Plan cannot be added,an error occurred.", data: [], error: err.message })
	}
}

exports.listSubscriptionPlan = async(req, res) => {
	try
	{
		const listPlan = await Models.SubscriptionPlans.findAll();
		res.status(200).send({ status: true, message: "Subscription plan listed successfully.", data: listPlan })
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Subscription Plan cannot be listed, an error occurred.", data: [], error: err.message });
	}
}

exports.getSubscriptionPlan = async(req, res) => {
	try
	{
		const { id } = req.params;
		const getPlan = await Models.SubscriptionPlans.findOne({ where:{ id } });
		if(getPlan) return res.status(200).send({ status: true, message: "Subscription plan geted successfully.", data: getPlan });
		else return res.status(400).send({ status: false, message: "Subscription plan not found.", data: [] });
	}
	catch(err)
	{
		res.status(500).send({ status: false, message: "Subscription plan cannot be get, an error occurred.", data: [], error: err.message });
	}
}

exports.updateSubscriptionPlan = async(req, res) => {
	try
	{
		const { id } = req.params;
		const { name, description, price, cancellation_period, max_domains_per_month, max_orders, status } = req.body;
		let isValid = fieldValidation(req.body)
		if(isValid.isTrue)
		{
			const planInfo = { name, description, price:parseFloat(price), cancellation_period, max_domains_per_month, max_orders, status };
			const updateData = await Models.SubscriptionPlans.update(planInfo,{ where:{ id:id } })
			res.status(200).send({ status: true, message: "Subscription plan updated successfully.", data: updateData })
		}
		else
		{
			res.status(400).send({ status: false, message: "All filed are required", field: isValid.requiredFields })
		}
	}
	catch(err)
	{
		console.log(err)
		res.status(500).send({ status: false, message: "Subscription plan cannot be updated, an error occurred.", data: [], error: err.message })
	}
}

exports.deleteSubscriptionPlan = async(req, res) => {
	try
	{
		const { id } = req.params;
		const deleteData = await Models.SubscriptionPlans.destroy({ where:{ id:id } });
		res.status(200).send({ status: true, message: "Subscription plan deleted successfully.", data: deleteData });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Subscription plan cannot be deleted, an error occurred.",data: [], error: err.message });
	}
}

function fieldValidation(bodyFiled)
{
	const requiredFields = ['name', 'description', 'price', 'cancellation_period', 'max_domains_per_month', 'max_orders', 'status'];
	const resp = {};
	const isValid = requiredFields.every(filed =>{
		return typeof bodyFiled[filed] !== 'undefined' && bodyFiled[filed] !== null && bodyFiled[filed] !== "";
	});
	resp.isTrue = isValid;
	resp.requiredFields = requiredFields
	return resp;
}