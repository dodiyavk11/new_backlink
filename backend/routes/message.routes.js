const { addMessageToOrder,getOrderMessageByOrderId,deleteOrderMessage, publisherMessageMenu, publisherUnreadMessageCount, publisherReadMessage } = require("../controllers/message.controller")
const { isLogin, isCustomer,isPublisher } = require("../middleware/checkAuthenticate")
const { assetsUpload } = require("../middleware/messageMiddleware");
module.exports = (app) =>{    
    app.post("/message/send/:order_id",[isLogin,assetsUpload.array("files[]",999999)],addMessageToOrder)
    app.get("/message/get/:order_id", [isLogin], getOrderMessageByOrderId);
    app.post("/message/delete/:id", [isLogin], deleteOrderMessage);
    app.get("/publisher/message/list",[isLogin,isPublisher],publisherMessageMenu)
    app.get("/publisher/message/unread",[isLogin,isPublisher],publisherUnreadMessageCount)
    app.get("/publisher/message/read/:order_id",[isLogin,isPublisher],publisherReadMessage)
}