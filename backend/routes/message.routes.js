const {
  addMessageToOrder,
  getOrderMessageByOrderId,
  deleteOrderMessage,
  publisherMessageMenu,
  publisherUnreadMessageCount,
  publisherReadMessage,
  getPublisherChatList,
  publisherReadMsg,
  getPublisherDomainMsg,
} = require("../controllers/message.controller");
const {
  isLogin,
  isCustomer,
  isPublisher,
} = require("../middleware/checkAuthenticate");
const { assetsUpload } = require("../middleware/messageMiddleware");
module.exports = (app) => {
  app.post(
    "/message/send/:domain_id",
    [isLogin, assetsUpload.array("files[]", 999999)],
    addMessageToOrder
  );
  app.get("/message/get/:domain_id", [isLogin], getOrderMessageByOrderId);
  app.get(
    "/message/get/:domain_id/:sender_id",
    [isLogin],
    getPublisherDomainMsg
  );
  app.post("/message/delete/:id", [isLogin], deleteOrderMessage);
  app.get(
    "/publisher/message/list",
    [isLogin, isPublisher],
    publisherMessageMenu
  );
  app.get(
    "/publisher/message/unread",
    [isLogin, isPublisher],
    publisherUnreadMessageCount
  );
  app.get(
    "/publisher/message/read/:order_id",
    [isLogin, isPublisher],
    publisherReadMessage
  );
  app.get("/publisher/chat-list", [isLogin, isPublisher], getPublisherChatList);
  app.get(
    "/publisher/read/:domain_id/:sender_id/",
    [isLogin, isPublisher],
    publisherReadMsg
  );

  // app.post("/message/send/:order_id",[isLogin,assetsUpload.array("files[]",999999)],addMessageToOrder)
  // app.get("/message/get/:order_id", [isLogin], getOrderMessageByOrderId);
  // app.post("/message/delete/:id", [isLogin], deleteOrderMessage);
  // app.get("/publisher/message/list",[isLogin,isPublisher],publisherMessageMenu)
  // app.get("/publisher/message/unread",[isLogin,isPublisher],publisherUnreadMessageCount)
  // app.get("/publisher/message/read/:order_id",[isLogin,isPublisher],publisherReadMessage)
};
