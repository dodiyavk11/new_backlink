const cron = require('node-cron');
const Models = require("./models");
const moment = require('moment');

async function updateStatusJob() {
  try {
    const currentDate = moment();
    const end_date = moment(currentDate).format('YYYY-MM-DD');

    const oldUpdateStatus = await Models.UserSubscription.update(
      { status: 0 },
      { where: { end_date } }
    );

    console.log('Status updated:', oldUpdateStatus);
  } catch (error) {
    console.error('An error occurred during the cron job:', error);
  }
}
cron.schedule('0 23 * * *', () => {
  console.log('Running cron job...');
  updateStatusJob();
});