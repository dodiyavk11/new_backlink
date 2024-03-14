const { linkBundlePlaceOrder } = require("../controllers/newOrder.controller");
const { isLogin, isCustomer,isAdmin,isPublisher } = require("../middleware/checkAuthenticate");

module.exports = (app) => {
	app.post("/link-bundle/:planId/placeOrder",[isLogin,isCustomer],linkBundlePlaceOrder)
}