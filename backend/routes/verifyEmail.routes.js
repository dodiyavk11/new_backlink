const { VerifyEmail } = require("../controllers/verifyEmail.controller");

module.exports = (app) => {
  app.get("/verify/email/:token", VerifyEmail);
}