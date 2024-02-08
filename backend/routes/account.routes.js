const {
  userProfile,
  UpdateProfile,
  changeEmail,
  updateBillingSetting,
  userUpdatePassword,
  userContactUs,
  adminGetContactUsData,
  adminMarkSolve,
} = require("../controllers/account.controller");
const {
  invoidePdfGenerate,
  invoidePdfGeneratePublisher,
  invoidePdfGenerateAdmin,
} = require("../controllers/generateInvoicePdf.controller");
const {
  userProfileAdminSide,
  userList,
  deleteUser,
  createUserAdminSide,
  userSubscriptionHistory,
  adminToUpdateuser,
  linkBundleBlogUpdate,
  linkBundleBlogGet,
  getAdminSetting,
  updateAdminSettings,
} = require("../controllers/admin.controller");
const {
  isLogin,
  isAdmin,
  isCustomer,
  isPublisher,
} = require("../middleware/checkAuthenticate");
const { upload } = require("../middleware/ProfilePicMiddle");
module.exports = (app) => {
  app.get("/account/user/profile", [isLogin], userProfile);
  app.patch(
    "/account/user/profile",
    [isLogin, upload.single("file")],
    UpdateProfile
  );
  app.patch("/account/user/email", [isLogin], changeEmail);
  app.patch("/account/user/billingSetting", [isLogin], updateBillingSetting);
  app.patch("/account/user/change-password", [isLogin], userUpdatePassword);
  /* user details get in admin side */
  app.post(
    "/account/user/profile/:uId",
    [isLogin, isAdmin],
    userProfileAdminSide
  );
  app.post("/account/user/list", [isLogin, isAdmin], userList);
  app.get(
    "/account/user/delete/:id/:isDeleted",
    [isLogin, isAdmin],
    deleteUser
  );
  app.post(
    "/account/user/create",
    [isLogin, isAdmin],
    upload.single("file"),
    createUserAdminSide
  );
  app.post(
    "/admin/update/user",
    [isLogin, isAdmin],
    upload.none(),
    adminToUpdateuser
  );

  app.post("/user/contact-us", userContactUs);
  app.get("/admin/contact-us-data", [isLogin, isAdmin], adminGetContactUsData);
  app.get("/admin/mark-resolved/:id", [isLogin, isAdmin], adminMarkSolve);
  app.get("/admin/link-bundle-content", [isLogin], linkBundleBlogGet);
  app.patch(
    "/admin/link-bundle-content",
    [isLogin, isAdmin],
    linkBundleBlogUpdate
  );

  app.patch(
    "/admin/link-bundle-content",
    [isLogin, isAdmin],
    linkBundleBlogUpdate
  );

  app.post("/user/generate-invoice", [isLogin, isCustomer], invoidePdfGenerate);
  app.post(
    "/publisher/generate-invoice",
    [isLogin, isPublisher],
    invoidePdfGeneratePublisher
  );
  app.post(
    "/admin/generate-invoice",
    [isLogin, isAdmin],
    invoidePdfGenerateAdmin
  );
  app.get("/get-settings", [isLogin], getAdminSetting);
  app.patch("/update/settings", [isLogin, isAdmin], updateAdminSettings);
};
