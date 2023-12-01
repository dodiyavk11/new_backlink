const { dashboard,setting,updateNotification,addCustomerDomain,getProjects,addMessageToOrder,transactionHistory,imageTest,getUserDomain,userAddStaticAmount } = require("../controllers/customer.controller")
const { isLogin, isCustomer } = require("../middleware/checkAuthenticate")
const { checkDomainLimitInSubscriptionPlan } = require("../middleware/checkIsPlanOrderAndDomainLimit");
module.exports = (app) =>{
    app.get("/user/dashboard",[isLogin,isCustomer],dashboard)
    app.get("/user/setting",[isLogin,isCustomer],setting)
    app.get("/user/projects",[isLogin,isCustomer],getProjects)
    app.patch("/user/setting/notification",[isLogin,isCustomer],updateNotification)
    app.post("/user/project",[isLogin,isCustomer,checkDomainLimitInSubscriptionPlan],addCustomerDomain)
    app.get("/user/transactionHistory",[isLogin,isCustomer],transactionHistory)
    app.get("/user/domain/:domainId",[isLogin,isCustomer],getUserDomain)

    app.post("/user/static/amount",[isLogin,isCustomer],userAddStaticAmount)
}