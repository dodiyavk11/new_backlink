const { addNewOrder } = require("../controllers/newOrder.controller");
const { isLogin, isCustomer,isAdmin } = require("../middleware/checkAuthenticate");
const { uploadOrderFile, uploadOrderFinalFile } = require("../middleware/orderFileHandler")
const { checkOrderLimitInSubscriptionPlan } = require("../middleware/checkIsPlanOrderAndDomainLimit");

module.exports = (app) => {
	app.post("/order/placeOrder",[isLogin,isCustomer,checkOrderLimitInSubscriptionPlan,uploadOrderFile.array("files[]",999999)],addNewOrder);
}