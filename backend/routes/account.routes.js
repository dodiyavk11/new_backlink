const { userProfile,UpdateProfile,userProfileAdminSide,userList,deleteUser,createUserAdminSide } = require("../controllers/account.controller")
const { isLogin,isAdmin } = require('../middleware/checkAuthenticate')
const { upload } = require("../middleware/ProfilePicMiddle")
module.exports = (app) => {
  app.post("/account/user/profile", isLogin, userProfile)
  app.patch("/account/user/profile", [isLogin, upload.single("file")], UpdateProfile)
  app.post("/account/user/profile/:uId", [isLogin, isAdmin], userProfileAdminSide)
  app.post("/account/user/list", [isLogin, isAdmin], userList)
  app.post("/account/user/delete/:id",[isLogin,isAdmin], deleteUser)
  app.post("/account/user/create",[isLogin,isAdmin],upload.single("file"), createUserAdminSide)
}