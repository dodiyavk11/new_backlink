const Models = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

exports.checkOrderLimitInSubscriptionPlan = async(req, res, next) => {
	try
	{
		const userId = req.userId;
		const plandData = await getUserPlanDetails(userId);

		let start_date;
		let end_date;
		if(plandData && plandData.length > 0)
		{
			// get plan start date and end date from User Subscribed plan
			start_date = new Date(plandData[0].start_date);
			end_date = new Date(plandData[0].end_date);
		}
		else
		{
			// if user has no plan purchased to set start date and end date as current month start date and mont end date 
			start_date = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');;
			end_date = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
		}

		// count order base on start date and end date
		const orderCount = await Models.Orders.count({
			where:{
				customer_id : userId,
				created_at : {
					[Op.gte]: new Date(start_date),
					[Op.lte]: new Date(end_date)
				}
			}
		})
		if(plandData && plandData.length > 0)
		{
			const planStartDate = new Date(plandData[0].start_date);
			const planEndDate = new Date(plandData[0].end_date);
			const current_date = new Date();
			if(current_date >= planStartDate && current_date <= planEndDate)
			{
				const orderLimit = plandData[0].plan.max_orders;
				if(orderCount >= orderLimit)
				{
					return res.status(403).send({ status: false, message: "Order limit exceeded for this subscription.", totalOrder: orderCount });
				}
				next()
			}
			else
			{  
				return res.status(403).send({ status: false, data: [], message: "You have no Active plan" })
			}			
		}
		else
		{
			res.status(403).send({ status: false, message: "You have no plan" })
		}
	}
	catch(err)
	{
		console.log(err)
		res.status(500).send({ status: false, message: "Something went to wrong", error: err.message });
	}
}

exports.checkDomainLimitInSubscriptionPlan = async(req, res, next) => {
	try
	{
		const userId = req.userId;
		const plandData = await getUserPlanDetails(userId);
		let start_date;
		let end_date;
		if(plandData && plandData.length > 0)
		{
			start_date = new Date(plandData[0].start_date);
			end_date = new Date(plandData[0].end_date);
		}
		else
		{
			start_date = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
			end_date = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
		}

		const domainCount = await Models.Domains.count({
			where: {
				user_id:userId,
				created_at:{
					[Op.gte]: new Date(start_date),
					[Op.lte]: new Date(end_date),
				}
			}
		});

		if(plandData && plandData.length > 0)
		{
			const planStartDate = new Date(plandData[0].start_date);
			const planEndDate = new Date(plandData[0].end_date);
			const current_date = new Date();
			if(current_date >= planStartDate && current_date <= planEndDate)
			{
				const domainLimit = plandData[0].plan.max_domains_per_month;
				if(domainCount >= domainLimit)
				{
					return res.status(403).send({ status: false, message: "Domain limit exceeded for this subscription.", totalDomain: domainCount });
				}
				next()
			}
			else
			{  
				return res.status(403).send({ status: false, data: [], message: "You have no Active plan" })
			}
		}
		else if(domainCount >= 3)
		{
			return res.status(403).send({ status: false, data: [], message: "Domain limit exceeded" })
		}
		else
		{
			next()
		}		
	}	
	catch(err)
	{
		console.log(err)
		res.status(500).send({ status: false, message: "Something went to wrong, Please try again.", error: err.message });
	}
}

async function getUserPlanDetails(userId)
{
	try {
		const plandData = await Models.UserSubscription.findAll({
			where: {
				user_id: userId,
				status: true,
			},
			include: [
				{
					model: Models.SubscriptionPlans,
					as: 'plan',
				}
			]
		});
		return plandData;
	}
	catch(err)
	{
		console.log(err);
	}
}
