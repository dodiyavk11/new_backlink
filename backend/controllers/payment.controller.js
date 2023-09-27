const Models = require("../models");
const Sequelize = require('sequelize');
const stripe = require("stripe")("sk_test_51NsHj9SC7x5vD10Msw6jkUut1c6QEMO0sN2RpWt1mnoiK0ccWOONIhCAWHwsAjdVSPpNuMtybe2a8dSxa1Po0IhN00ootqyaJH");

exports.initPayment = async(req, res) => {
	try
	{
		const { product } = req.body;
		const id = req.userId
		const userInfo = await Models.Users.findOne({ where:{ id:id } })
		if(userInfo.dataValues.email)
		{
			const customer = await stripe.customers.create({
			  	email: userInfo.dataValues.email, // Replace with the user's email
				metadata: {
					userId: id,
				},			  
			});
			const customerId = customer.id;
		    const session = await stripe.checkout.sessions.create({
		        payment_method_types: ["card"],
		        customer: customerId,
		        metadata: {
					userid: id,
				},	
		        line_items: [
		            {
		                price_data: {
		                    currency: "inr",
		                    product_data: {
		                        name: product.name,
		                        images: [product.image],
		                    },
		                    unit_amount: product.amount * 100,
		                },
		                quantity: product.quantity,
		            },
		        ],
		        mode: "payment",
		        success_url: `https://6812-150-129-148-240.ngrok-free.app/getPayments`,
		        cancel_url: `http://localhost:3000/cancel.html`,
		    });
		    res.status(200).send({ status: true, message: "Stripe created session successfully.", id: session.id })
		    // res.json({ id: session.id });
		}			    
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message:"Something went to wrong, Please try again",error:err.message })
	}
}
exports.getPaymentDetails = async (req, res) => {
	let { data, type } = req.body
	let { previous_attributes, object } = data
	try {
		if(type === 'checkout.session.completed')
		{
			const newData = data.object;
			const created = newData.created;

			const unixTimestamp = created;
			const date = new Date(unixTimestamp * 1000);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');
			const seconds = String(date.getSeconds()).padStart(2, '0');
			const payment_created = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

			const transaction_id = newData.payment_intent;
			const amount = newData.amount_total / 100;
			const currency = newData.currency;	
			const transaction_type = type;
			const user_id = newData.metadata.userid;
			let description = null;
			let isPlan = false;
			if(newData.metadata && newData.metadata.planId !== undefined)
			{
				isPlan = true;
				const getPlan = await Models.SubscriptionPlans.findOne({ where:{ id:newData.metadata.planId } });
				description = "Subscription Plans : "+getPlan.name;
			}
			const tranInfo = { user_id,amount,transaction_type,description,payment_created,transaction_id,isPlan,paymentData:newData }
			const transaction = await Models.Transactions.create(tranInfo);

			if(newData.metadata && newData.metadata.planId !== undefined)
			{								
				const transaction_id = transaction.id;
				const currentDate = new Date();
				const endDate = new Date(currentDate);
				endDate.setMonth(endDate.getMonth() + 1);
				const end_date = endDate.toISOString().slice(0, 19).replace('T', ' ');

				const userSubscription = { user_id,plan_id:newData.metadata.planId,end_date,transaction_id }
				const userSubscriptionAdd = await Models.UserSubscription.create(userSubscription);
			}
			else
			{
				const walletInfo = await Models.UserWallet.findOne({ where:{ user_id:user_id }});	
				if (walletInfo) {
			    	const balance = parseFloat(amount) + parseFloat(walletInfo.balance);
					const updateOnfo = { balance }
			       	const walletInfoData = await Models.UserWallet.update(updateOnfo, {
						      where: { id: walletInfo.dataValues.id },
						    });
			    } else {
					const walletInfoData = await Models.UserWallet.create({ user_id, balance: amount });
			    }
			}			
		    res.json({ received: true });
		}	 
	}
	catch (err) {
	  console.log("/webhooks route error: ", err)
	  res.status(500).send({ status: false, message: "Something went to wrong, Please try again.",error:err.message })
	}
}

exports.initPaymentPlan = async(req, res) => {
	try
	{
		const { product } = req.body;
		const user_id = req.userId;
		if(product.planId)
		{
			const getPlan = await Models.SubscriptionPlans.findOne({ where:{ id:product.planId } });
			const userInfo = await Models.Users.findOne({ where:{ id:user_id } });
			const customer = await stripe.customers.create({
				email: userInfo.dataValues.email,
				metadata: {
					userId: user_id
				}
			});
			const customerId = customer.id;
			const session = await stripe.checkout.sessions.create({
				payment_method_types:['card'],
				customer: customerId,
				metadata: {
					userid : user_id,
					planId: product.planId
				},
				line_items:[
					{
						price_data : {
							currency: 'inr',
							product_data:{
								name: getPlan.dataValues.name
							},
							unit_amount: getPlan.dataValues.price * 100
						},
						quantity: 1,
					}
				],
				mode: "payment",
				success_url: `https://6812-150-129-148-240.ngrok-free.app/getPayments`,
				cancel_url: `http://localhost:300/cancel.html`
			});
			return res.status(200).send({ status: true, message: "Payment session created successfully.", id: session.id })
		}		
	}
	catch(err)
	{
		console.log(err);
		res.status(500).send({ status: false, message: "Something went to wrong",data: [], error: err.message })
	}
}

exports.viewTranscation = async(req, res) => {
	res.send("Transcation saved...")
}

exports.refundPayment = async(req, res) => {
	const { id } = req.params
	const paymentIntentId = id;

	// Create a refund for the PaymentIntent
	stripe.refunds.create({
	  payment_intent: paymentIntentId,
	});
	res.send("Success...")
}