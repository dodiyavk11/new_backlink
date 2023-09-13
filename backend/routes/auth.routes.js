const { signIn, signUp, GetAllUser, DeleteUser, Forgotpassword, ForgotPasswordLink, ResendMail, permission } = require("../controllers/auth.controller")
const { upload } = require("../middleware/ProfilePicMiddle")

module.exports = (app) => {
  app.post("/signup", upload.single("file"), signUp);
  app.post("/signin", upload.any(), signIn)
  app.post('/ForgotPasswordLink', ForgotPasswordLink)
  app.post("/forgotPassword/:token", Forgotpassword)

}