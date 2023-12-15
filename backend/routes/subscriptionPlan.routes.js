const { addSubscriptionPlan,listSubscriptionPlan,getSubscriptionPlan,updateSubscriptionPlan, deleteSubscriptionPlan,userSubscriptionHistory ,updatePlanStatus} = require("../controllers/subscriptionPlan.controller")
const {  isLogin, isAdmin  } = require("../middleware/checkAuthenticate")
module.exports = (app) => {
	app.post("/subscriptionPlan/add", [isLogin,isAdmin], addSubscriptionPlan);
	app.get("/subscriptionPlan/list", [isLogin], listSubscriptionPlan);
	app.get("/subscriptionPlan/get/:id", [isLogin,isAdmin], getSubscriptionPlan);
	app.patch("/subscriptionPlan/update/:id", [isLogin, isAdmin], updateSubscriptionPlan);
	app.delete("/subscriptionPlan/delete/:id", [isLogin, isAdmin], deleteSubscriptionPlan);

	app.get("/users/subscription/history",[isLogin,isAdmin], userSubscriptionHistory)
	app.get("/admin/plan/update/:id/:status", [isLogin,isAdmin], updatePlanStatus)
}