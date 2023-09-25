const { dashboard,setting,updateNotification,addCustomerDomain,getProjects,addMessageToOrder,transactionHistory } = require("../controllers/customer.controller")
const { isLogin, isCustomer } = require("../middleware/checkAuthenticate")
module.exports = (app) =>{
    app.get("/user/dashboard",[isLogin,isCustomer],dashboard)
    app.get("/user/setting",[isLogin,isCustomer],setting)
    app.get("/user/projects",[isLogin,isCustomer],getProjects)
    app.patch("/user/setting/notification",[isLogin,isCustomer],updateNotification)
    app.post("/user/project",[isLogin,isCustomer],addCustomerDomain)
    app.get("/user/transactionHistory",[isLogin,isCustomer],transactionHistory)
}