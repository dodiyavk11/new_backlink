const { dashboard,setting,updateNotification,addCustomerDomain,getProjects,addMessageToOrder,transactionHistory,imageTest,getUserDomain,userAddStaticAmount,updateMonthlyBudget,updateArchiveProject } = require("../controllers/customer.controller")
const { isLogin, isCustomer } = require("../middleware/checkAuthenticate")
const { checkDomainLimitInSubscriptionPlan } = require("../middleware/checkIsPlanOrderAndDomainLimit");
module.exports = (app) =>{
    app.get("/user/dashboard",[isLogin,isCustomer],dashboard)
    app.get("/user/setting",[isLogin,isCustomer],setting)
    app.get("/user/projects",[isLogin,isCustomer],getProjects)
    app.patch("/user/setting/notification",[isLogin,isCustomer],updateNotification)
    app.post("/user/project",[isLogin,isCustomer,checkDomainLimitInSubscriptionPlan],addCustomerDomain)
    app.get("/user/transactionHistory",[isLogin,isCustomer],transactionHistory)
    app.get("/user/domain/:hash_id",[isLogin,isCustomer],getUserDomain)
    app.patch("/domain/archive/:hash_id/:status",[isLogin,isCustomer],updateArchiveProject)

    app.post("/user/static/amount",[isLogin,isCustomer],userAddStaticAmount)
    app.post("/user/project/budget",[isLogin,isCustomer],updateMonthlyBudget)
}