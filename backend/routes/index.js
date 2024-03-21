module.exports = (app) => {
  require("./auth.routes")(app);
  require("./verifyEmail.routes")(app);
  require("./email.routes")(app);
  require("./domaincategory.routes")(app);
  require("./domain.routes")(app);
  require("./account.routes")(app);
  require("./blog.routes")(app);
  require("./faq.routes")(app);
  require("./customer.routes")(app);
  require("./payment.routes")(app);
  require("./ahref.routes")(app);
  require("./subscriptionPlan.routes")(app);
  require("./subscription.routes.js")(app);
  require("./backlink.route")(app);
  require("./newOrder.routes")(app);
  require("./message.routes.js")(app);
};
