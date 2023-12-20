const Models = require("../models");
const Sequelize = require('sequelize');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { sendVerifyMail, emailTemplate } = require("../utils/emailsUtils");

async function createProduct() {
  try {
    const product = await stripe.products.create({
      name: 'Custom Product', // Give it a generic name
    });
    return product.id;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

// Create a price for the product
async function createPrice(productId, amount) {
  try {
    const price = await stripe.prices.create({
      product: productId,
      unit_amount: amount * 100, // Convert the amount to the smallest currency unit
      currency: 'inr', // Currency code
    });
    return price.id;
  } catch (error) {
    console.error('Error creating price:', error);
    throw error;
  }
}

// Create a Stripe Checkout session using the price
async function createCheckoutSession(priceId) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://4fef-103-247-54-225.ngrok-free.app/getPayments',
      cancel_url: 'http://localhost:3000/cancel.html',
    });
    return session.id;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// Your API endpoint to initiate the payment
exports.initPaymentFrontSide = async (req, res) => {  
  try {
  	const id = req.userId;
  	const userInfo = await Models.Users.findOne({ where:{ id } })
  	const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency || 'inr',
      payment_method_types: ['card'],
      metadata: {
	    user_name: `${userInfo.dataValues.firstName} ${userInfo.dataValues.lastName}`,
	    user_id: id,
	    user_email: userInfo.dataValues.email
	  },
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create PaymentIntent' });
  }
};

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
		        success_url: `https://4fef-103-247-54-225.ngrok-free.app/getPayments`,
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
			const createdAt = newData.created;
			const transaction_id = newData.payment_intent;			
			const payment_status = newData.payment_status;			
			const unixTimestamp = createdAt;
			const date = new Date(unixTimestamp * 1000);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');
			const seconds = String(date.getSeconds()).padStart(2, '0');
			const payment_created = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			
			const amount = newData.amount_total / 100;
			const currency = newData.currency;	
			const transaction_type = type;
			const user_id = newData.metadata.userid;
			let description = 'Order';
			let isPlan = false;
			let getPlan;
			if(newData.metadata && newData.metadata.planId !== undefined)
			{
				isPlan = true;
				getPlan = await Models.SubscriptionPlans.findOne({ where:{ id:newData.metadata.planId } });
				description = "Subscription Plans : "+getPlan.name;
			}
			const tranInfo = { user_id,amount,transaction_type,description,payment_created,transaction_id,isPlan,status:payment_status,paymentData:newData }
			const [transaction, created] = await Models.Transactions.findOrCreate({
			  where: {
			    transaction_id: transaction_id,
			  },
			  defaults: tranInfo,
			});
			if (created) 
			{
				if(newData.metadata && newData.metadata.planId !== undefined)
				{								
					const transaction_id = transaction.id;
					const currentDate = new Date();
					const endDate = new Date(currentDate);
					endDate.setMonth(endDate.getMonth() + 1); //add current date to 1 month
					const end_date = endDate.toISOString().slice(0, 19).replace('T', ' ');

					// const daysToAdd =3; // Number of days to add
					// const endDate = new Date(currentDate);
					// endDate.setDate(currentDate.getDate() + daysToAdd);

					const userInfo = await Models.Users.findOne({ where:{ id:user_id } });
					const mailText = await Models.email_format.findOne({ where: { email_type: "subscription_purchase" } });
					let text = mailText.email_content;
					let subject = mailText.header;
					let username = userInfo.dataValues.firstName+' '+userInfo.dataValues.lastName;
					text = text.replace("{username}", username);
					text = text.replace("{planname}", getPlan.name);
					text = text.replace("{price}", getPlan.price);
					text = text.replace("{startdate}", currentDate);
					text = text.replace("{enddate}", end_date);
					const email = await emailTemplate(text);		
					sendVerifyMail(userInfo.dataValues.email,subject,"",email);

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
				success_url: `https://4fef-103-247-54-225.ngrok-free.app/getPayments`,
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