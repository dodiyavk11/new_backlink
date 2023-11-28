const { userProfile,UpdateProfile,changeEmail,updateBillingSetting,userUpdatePassword } = require("../controllers/account.controller")
const { userProfileAdminSide,userList,deleteUser,createUserAdminSide,userSubscriptionHistory } = require("../controllers/admin.controller")
const { isLogin,isAdmin } = require('../middleware/checkAuthenticate')
const { upload } = require("../middleware/ProfilePicMiddle")
module.exports = (app) => {
  app.get("/account/user/profile", [isLogin], userProfile)
  app.patch("/account/user/profile", [isLogin, upload.single("file")], UpdateProfile)  
  app.patch("/account/user/email", [isLogin], changeEmail) 
  app.patch("/account/user/billingSetting", [isLogin], updateBillingSetting) 
  app.patch("/account/user/change-password", [isLogin], userUpdatePassword) 
  /* user details get in admin side */
  app.post("/account/user/profile/:uId", [isLogin, isAdmin], userProfileAdminSide)
  app.post("/account/user/list", [isLogin, isAdmin], userList)
  app.post("/account/user/delete/:id",[isLogin,isAdmin], deleteUser)
  app.post("/account/user/create",[isLogin,isAdmin],upload.single("file"), createUserAdminSide)
}