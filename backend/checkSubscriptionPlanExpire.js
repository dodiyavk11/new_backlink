const cron = require('node-cron');
const Sequelize = require('sequelize');
const Models = require("./models");
const { sendVerifyMail, emailTemplate } = require("./utils/emailsUtils");
// Define the cron job schedule (run daily at 00:00 (midnight))
//const task = cron.schedule('0 0 * * *', async () => {
// Define the cron job schedule (run continues)
const task = cron.schedule('* * * * *', async () => { // Make the callback function async
  try {
    const currentDate = new Date();
    const activeSubscriptions = await Models.UserSubscription.findAll({
      where: {
        status: 1,
      },
      include: [        
        {
          model: Models.SubscriptionPlans,
          as: 'plan',
          attributes: ['name','price','description','validity']
        },
      ],
    });

    for (const subscription of activeSubscriptions) {
      const startDate = new Date(subscription.start_date);
      const endDate = new Date(subscription.end_date);
      const validityDays = subscription.plan.validity;
      const expirationDate = new Date(startDate.getTime() + validityDays * 24 * 60 * 60 * 1000);

      if (currentDate > expirationDate) {
        await Models.UserSubscription.update({ status: 0 },{ where:{ id: subscription.id } });

        const formattedEndDate = endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const formattedStartDate = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const userInfo = await Models.Users.findOne({ where:{ id: subscription.user_id } });
        const mailText = await Models.email_format.findOne({ where: { email_type: "subscription_expire" } });
        let text = mailText.email_content;
        let subject = mailText.header;
        let username = userInfo.dataValues.firstName+' '+userInfo.dataValues.lastName;
        text = text.replace("{username}", username);
        text = text.replace("{planname}", subscription.plan.name);
        text = text.replace("{price}", subscription.plan.price);
        text = text.replace("{startdate}", formattedStartDate);
        text = text.replace("{enddate}", formattedEndDate);
        const email = await emailTemplate(text);    
        sendVerifyMail(userInfo.dataValues.email,subject,"",email);
        console.log('Subscription status updated.');
      }
    }    
  } catch (error) {
    console.error('Error updating subscription status:', error);
  }
});
task.start(); // Start the cron job
