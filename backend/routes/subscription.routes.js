const {
  addSubscription,
  listSubscription,
  updateSubscription,
  updateSubscriptionStatus,
  getActiveSubscription,
  listSubscriptionActive,
} = require("../controllers/subscription.controller");
const {
  isLogin,
  isAdmin,
  isCustomer,
} = require("../middleware/checkAuthenticate");
module.exports = (app) => {
  app.post("/add/subscription", [isLogin, isAdmin], addSubscription);
  app.get("/new-subscription/list", [isLogin], listSubscription);
  app.get("/subscription/list/active", [isLogin], listSubscriptionActive);
  app.patch("/subscription/update/:id", [isLogin, isAdmin], updateSubscription);
  app.get(
    "/admin/subscription/update/:id/:status",
    [isLogin, isAdmin],
    updateSubscriptionStatus
  );
  app.get(
    "/get-active-subscription",
    [isLogin, isCustomer],
    getActiveSubscription
  );
};
