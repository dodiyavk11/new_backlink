const { addNewOrder,getPublisherOrder,publisherUpdateOrderStatus,cancelOrder, getUserOrders,textFileUpload, addToCart, deleteItem, getCart, addCartOrder } = require("../controllers/newOrder.controller");
const { isLogin, isCustomer,isAdmin,isPublisher } = require("../middleware/checkAuthenticate");
const { uploadOrderFile, uploadOrderFinalFile,textFileUploadTemp } = require("../middleware/orderFileHandler")
const { checkOrderLimitInSubscriptionPlan } = require("../middleware/checkIsPlanOrderAndDomainLimit");

module.exports = (app) => {
	/* customer(user) route */
	// app.post("/order/placeOrder",[isLogin,isCustomer,uploadOrderFile.array("files[]",999999)],addNewOrder);
	app.post("/order/:hash_id/placeOrder",[isLogin,isCustomer],addNewOrder);
	app.post("/order/cart/order",[isLogin,isCustomer],addCartOrder);
	app.get("/order/cancelOrder/:orderId",[isLogin,isCustomer],cancelOrder);
	app.post("/user/orders",[isLogin,isCustomer],getUserOrders)
	app.post("/user/cart/add-item/:hash_id",[isLogin,isCustomer],addToCart)
	app.delete("/user/cart/:cart_id",[isLogin,isCustomer],deleteItem)
	app.get("/user/cart",[isLogin, isCustomer],getCart)
	/* backlink text file uploda */
	app.post("/files",[isLogin,isCustomer,textFileUploadTemp.single("file")],textFileUpload)

	/* publisher route */
	app.post('/publisher/orders',[isLogin,isPublisher],getPublisherOrder)
	app.post('/publisher/updateOrderStatus/:orderId',[isLogin,isPublisher],publisherUpdateOrderStatus)
}