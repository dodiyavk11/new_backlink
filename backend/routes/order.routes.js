const { addOrder,getAllOrders,getOrderByUserId,getOrderByOrderId,updateOrder,deleteOrderFile,deleteOrder,addOrderFile,getOrderFile,deleteOrderFinalFile } = require("../controllers/order.controller") 
const { isLogin, isCustomer,isAdmin } = require("../middleware/checkAuthenticate")
const { assetsUpload } = require("../middleware/messageMiddleware");
const { uploadOrderFile, uploadOrderFinalFile } = require("../middleware/orderFileHandler")

module.exports = (app) => {
	app.post("/order/add",[isLogin,isCustomer,uploadOrderFile.array("files[]",999999)],addOrder);
	app.get("/order/get/all", [isLogin,isAdmin], getAllOrders);
	// app.post("/order/get/filter", [checkAuth, isAdmin], GetFilteredOrder)
  	app.get("/order/get", [isLogin], getOrderByUserId)
	app.get("/order/get/:order_id", [isLogin], getOrderByOrderId)
	app.patch("/order/update/:order_id", [isLogin, uploadOrderFile.array("files[]",999999)], updateOrder);
	app.post("/order/fileDelete", [isLogin], deleteOrderFile);
	app.get("/order/remove/:order_id", [isLogin], deleteOrder);
	app.post("/order/addFile/:order_id",[isLogin, isAdmin, uploadOrderFinalFile.array("files[]",999999)],addOrderFile);
	app.get("/order/file/get/:order_id",[isLogin],getOrderFile);
	app.post("/order/finalFileDelete/:id",[isLogin],deleteOrderFinalFile)	
}