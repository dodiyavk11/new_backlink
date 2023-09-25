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
		        success_url: `http://localhost:3000/getPayments`,
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
			const tranInfo = { user_id,amount,transaction_type,payment_created,transaction_id }

			const transaction = await Models.Transactions.create(tranInfo);
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
		    res.json({ received: true });
		    // res.status(200).send({ status: true, message: "Wallte amount added successfully.", data: walletInfo  })
		}	 
	}
	catch (err) {
	  console.log("/webhooks route error: ", err)
	  res.status(500).send({ status: false, message: "Something went to wrong, Please try again.",error:err.message })
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