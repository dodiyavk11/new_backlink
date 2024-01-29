const { addNewOrder,getPublisherOrder,publisherUpdateOrderStatus,cancelOrder, getUserOrders, getAdminAllOrders,textFileUpload, textFileDelete,addToCart, deleteItem, getCart, addCartOrder,viewSingleOrderPublisher,viewSingleOrderUser,viewSingleOrderAdmin, linkBundlePlaceOrder, exportDataCsvPublisher, donwlodFile } = require("../controllers/newOrder.controller");
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
	app.post("/admin/orders",[isLogin,isAdmin],getAdminAllOrders)
	app.post("/user/cart/add-item/:hash_id",[isLogin,isCustomer],addToCart)
	app.delete("/user/cart/:cart_id",[isLogin,isCustomer],deleteItem)
	app.get("/user/cart",[isLogin],getCart)
	/* backlink text file uploda */
	app.post("/files",[isLogin,isCustomer,textFileUploadTemp.single("file")],textFileUpload)
	app.get("/files/delete/:filename",[isLogin,isCustomer],textFileDelete)

	/* publisher route */
	app.post('/publisher/orders',[isLogin,isPublisher],getPublisherOrder)
	app.get('/publisher/orders/export',[isLogin,isPublisher],exportDataCsvPublisher)
	app.post('/publisher/updateOrderStatus/:orderId',[isLogin,isPublisher],publisherUpdateOrderStatus)

	/* for publisher and user both view single order */
	app.get("/publisher/order/view/:orderId",[isLogin,isPublisher],viewSingleOrderPublisher);
	app.get("/user/order/view/:orderId",[isLogin,isCustomer],viewSingleOrderUser);
	app.get("/admin/order/view/:orderId",[isLogin,isAdmin],viewSingleOrderAdmin);

	app.post("/link-bundle/:planId/placeOrder",[isLogin,isCustomer],linkBundlePlaceOrder)
	app.get('/file-download/:filename/:order_id',[isLogin],donwlodFile)
}