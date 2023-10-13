const { addNewOrder,getPublisherOrder,publisherUpdateOrderStatus,cancelOrder, getUserOrders } = require("../controllers/newOrder.controller");
const { isLogin, isCustomer,isAdmin,isPublisher } = require("../middleware/checkAuthenticate");
const { uploadOrderFile, uploadOrderFinalFile } = require("../middleware/orderFileHandler")
const { checkOrderLimitInSubscriptionPlan } = require("../middleware/checkIsPlanOrderAndDomainLimit");

module.exports = (app) => {
	/* customer(user) route */
	app.post("/order/placeOrder",[isLogin,isCustomer,uploadOrderFile.array("files[]",999999)],addNewOrder);
	app.get("/order/cancelOrder/:orderId",[isLogin,isCustomer],cancelOrder);
	app.post("/user/orders",[isLogin,isCustomer],getUserOrders)
	/* publisher route */
	app.post('/publisher/orders',[isLogin,isPublisher],getPublisherOrder)
	app.post('/publisher/updateOrderStatus/:orderId',[isLogin,isPublisher],publisherUpdateOrderStatus)
}