const { addOrder,getAllOrders,getOrderByUserId,getOrderByOrderId,updateOrder,deleteOrderFile,deleteOrder,addOrderFile,getOrderFile,deleteOrderFinalFile,updateOrderStatus,addOrderCloundLinks,updateOrderCloundLinks,deleteCloudLinks, test } = require("../controllers/order.controller") 
const { isLogin, isCustomer,isAdmin } = require("../middleware/checkAuthenticate")
const { assetsUpload } = require("../middleware/messageMiddleware");
const { uploadOrderFile, uploadOrderFinalFile } = require("../middleware/orderFileHandler")
const { checkOrderLimitInSubscriptionPlan } = require("../middleware/checkIsPlanOrderAndDomainLimit");
module.exports = (app) => {
	app.post("/order/add",[isLogin,isCustomer,checkOrderLimitInSubscriptionPlan,uploadOrderFile.array("files[]",999999)],addOrder);
	app.get("/order/get/all", [isLogin,isAdmin], getAllOrders);
  	app.get("/order/get", [isLogin], getOrderByUserId)
	app.get("/order/get/:order_id", [isLogin], getOrderByOrderId)
	app.patch("/order/update/:order_id", [isLogin, uploadOrderFile.array("files[]",999999)], updateOrder);
	app.post("/order/fileDelete", [isLogin], deleteOrderFile);
	app.get("/order/remove/:order_id", [isLogin], deleteOrder);
	app.post("/order/addFile/:order_id",[isLogin, isAdmin, uploadOrderFinalFile.array("files[]",999999)],addOrderFile);
	app.get("/order/file/get/:order_id",[isLogin],getOrderFile);
	app.post("/order/finalFileDelete/:id",[isLogin],deleteOrderFinalFile)	
	app.post("/order/updateStatus/:order_id",[isLogin],updateOrderStatus)
	app.post("/order/addCloudLinks/:order_id",[isLogin],addOrderCloundLinks)
	app.post("/order/updateCloudLinks/:id",[isLogin],updateOrderCloundLinks)
	app.get("/order/deleteCloudLinks/:id",[isLogin],deleteCloudLinks)	
}