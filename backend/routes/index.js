module.exports = (app) => {
  require("./auth.routes")(app)
  require("./verifyEmail.routes")(app)
  require("./email.routes")(app)
  require("./domaincategory.routes")(app)
  require("./domain.routes")(app)
  require("./account.routes")(app)
  require("./blog.routes")(app)
  require("./faq.routes")(app)
}