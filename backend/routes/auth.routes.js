const { signIn, signUp, GetAllUser, DeleteUser, Forgotpassword, ForgotPasswordLink, ResendMail, permission,adminLoginAsSuperAdmin } = require("../controllers/auth.controller")
const { upload } = require("../middleware/ProfilePicMiddle")
const { isLogin,isAdmin } = require('../middleware/checkAuthenticate')

module.exports = (app) => {
  app.post("/signup", upload.single("file"), signUp);
  app.post("/signin", upload.any(), signIn)  
  app.post('/ForgotPasswordLink', ForgotPasswordLink)
  app.post("/forgotPassword/:token", Forgotpassword)

  app.get("/admin/login/superadmin/:id",[isLogin,isAdmin],adminLoginAsSuperAdmin)
}