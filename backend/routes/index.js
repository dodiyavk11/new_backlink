module.exports = (app) => {
  require("./auth.routes")(app)
  require("./verifyEmail.routes")(app)
}