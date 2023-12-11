const { addMessageToOrder,getOrderMessageByOrderId,deleteOrderMessage } = require("../controllers/message.controller")
const { isLogin, isCustomer } = require("../middleware/checkAuthenticate")
const { assetsUpload } = require("../middleware/messageMiddleware");
module.exports = (app) =>{    
    app.post("/message/send/:order_id",[isLogin,assetsUpload.array("files[]",999999)],addMessageToOrder)
    app.get("/message/get/:order_id", [isLogin], getOrderMessageByOrderId);
    app.post("/message/delete/:id", [isLogin], deleteOrderMessage);
}