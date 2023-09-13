module.exports = (app) => {
  require("./auth.routes")(app)
  require("./verifyEmail.routes")(app)
  require("./email.routes")(app)
  require("./domaincategory.routes")(app)
}